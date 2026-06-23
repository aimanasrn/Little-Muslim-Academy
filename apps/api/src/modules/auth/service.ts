import { signJwt } from "../../lib/jwt.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";

const parentUser = {
  id: "user_parent_demo",
  email: "parent@example.com",
  passwordHash: hashPassword("password123"),
  role: "parent"
} as const;

export function signIn(email: string, password: string) {
  if (email !== parentUser.email || !verifyPassword(password, parentUser.passwordHash)) {
    return null;
  }

  return {
    token: signJwt({ userId: parentUser.id, role: parentUser.role }),
    user: {
      id: parentUser.id,
      email: parentUser.email,
      role: parentUser.role
    }
  };
}
