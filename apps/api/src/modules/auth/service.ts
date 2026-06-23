import { signJwt } from "../../lib/jwt.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
import { getPrisma } from "../../lib/prisma.js";

const demoUsers = [
  {
    id: "user_parent_demo",
    email: "parent@example.com",
    passwordHash: await hashPassword("password123"),
    role: "parent",
    hasLifetimeAccess: true
  },
  {
    id: "user_admin_demo",
    email: "admin@example.com",
    passwordHash: await hashPassword("password123"),
    role: "admin",
    hasLifetimeAccess: true
  }
] as const;

export function getCurrentUser(userId: string) {
  const matchedUser = demoUsers.find((user) => user.id === userId);

  return matchedUser
    ? {
        id: matchedUser.id,
        email: matchedUser.email,
        role: matchedUser.role,
        hasLifetimeAccess: matchedUser.hasLifetimeAccess
      }
    : null;
}

export async function findCurrentUser(userId: string) {
  try {
    const user = await getPrisma().user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        hasLifetimeAccess: true
      }
    });

    return user ?? getCurrentUser(userId);
  } catch {
    return getCurrentUser(userId);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const user = await getPrisma().user.findUnique({
      where: { email }
    });

    if (user && (await verifyPassword(password, user.passwordHash))) {
      return {
        token: signJwt({ userId: user.id, role: user.role }),
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          hasLifetimeAccess: user.hasLifetimeAccess
        }
      };
    }
  } catch {
    // Fall through to demo fallback when the local database is unavailable.
  }

  const matchedUser = demoUsers.find((user) => user.email === email);

  if (!matchedUser || !(await verifyPassword(password, matchedUser.passwordHash))) {
    return null;
  }

  return {
    token: signJwt({ userId: matchedUser.id, role: matchedUser.role }),
    user: getCurrentUser(matchedUser.id)
  };
}

export async function signUpParent(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await getPrisma().user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return { error: "An account with this email already exists" } as const;
    }

    const passwordHash = await hashPassword(password);
    const user = await getPrisma().user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        role: "parent",
        preferredLanguage: "en",
        hasLifetimeAccess: false
      }
    });

    return {
      token: signJwt({ userId: user.id, role: user.role }),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        hasLifetimeAccess: user.hasLifetimeAccess
      }
    } as const;
  } catch {
    return { error: "Sign up is unavailable right now" } as const;
  }
}
