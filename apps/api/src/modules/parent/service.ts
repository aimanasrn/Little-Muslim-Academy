import { WORLD_KEYS } from "@little-muslim/shared";
import { getPrisma } from "../../lib/prisma.js";

function getCompletedLevels(stars: number) {
  return Math.max(1, Math.floor(stars / 4));
}

function getUnlockedWorlds(currentWorldKey: string | null, hasLifetimeAccess: boolean) {
  if (!hasLifetimeAccess) {
    return 2;
  }

  if (!currentWorldKey) {
    return 1;
  }

  const worldIndex = WORLD_KEYS.indexOf(currentWorldKey as (typeof WORLD_KEYS)[number]);
  return worldIndex >= 0 ? worldIndex + 1 : 1;
}

function getLevel(stars: number) {
  return Math.max(1, Math.floor(stars / 12) + 1);
}

function getWorldProgressIndex(worldKey: string | null) {
  if (!worldKey) {
    return -1;
  }

  return WORLD_KEYS.indexOf(worldKey as (typeof WORLD_KEYS)[number]);
}

function getFarthestWorldKey(currentWorldKey: string | null, nextWorldKey: string | null) {
  const currentIndex = getWorldProgressIndex(currentWorldKey);
  const nextIndex = getWorldProgressIndex(nextWorldKey);

  return nextIndex > currentIndex ? nextWorldKey : currentWorldKey;
}

export async function getParentOverview(userId: string) {
  const user = await getPrisma().user.findUnique({
    where: { id: userId },
    include: {
      children: {
        orderBy: { name: "asc" }
      },
      payments: {
        orderBy: { id: "desc" }
      }
    }
  });

  if (!user) {
    return null;
  }

  const activeChild = user.children[0] ?? null;
  const latestPayment = user.payments[0] ?? null;

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      hasLifetimeAccess: user.hasLifetimeAccess
    },
    paymentStatus: user.hasLifetimeAccess
      ? "Lifetime access active"
      : latestPayment?.status === "pending"
        ? "Payment pending"
        : "Preview only",
    childProfiles: user.children.map((child) => ({
      id: child.id,
      name: child.name,
      stars: child.stars,
      coins: child.coins,
      currentWorldKey: child.currentWorldKey,
      level: getLevel(child.stars),
      completedLevels: getCompletedLevels(child.stars),
      unlockedWorlds: getUnlockedWorlds(child.currentWorldKey, user.hasLifetimeAccess)
    })),
    activeChild: activeChild
      ? {
          id: activeChild.id,
          name: activeChild.name,
          stars: activeChild.stars,
          coins: activeChild.coins,
          currentWorldKey: activeChild.currentWorldKey,
          level: getLevel(activeChild.stars),
          completedLevels: getCompletedLevels(activeChild.stars),
          unlockedWorlds: getUnlockedWorlds(activeChild.currentWorldKey, user.hasLifetimeAccess)
        }
      : null
  };
}

type UpdateChildProgressInput = {
  childId: string;
  starsEarned: number;
  coinsEarned: number;
  currentWorldKey: string | null;
  allowAnyChild?: boolean;
};

export async function updateChildProgress(userId: string, input: UpdateChildProgressInput) {
  const child = await getPrisma().childProfile.findFirst({
    where: {
      id: input.childId,
      ...(input.allowAnyChild ? {} : { userId })
    }
  });

  if (!child) {
    return null;
  }

  const updatedChild = await getPrisma().childProfile.update({
    where: { id: child.id },
    data: {
      stars: {
        increment: input.starsEarned
      },
      coins: {
        increment: input.coinsEarned
      },
      currentWorldKey: getFarthestWorldKey(child.currentWorldKey, input.currentWorldKey)
    }
  });

  return {
    id: updatedChild.id,
    name: updatedChild.name,
    stars: updatedChild.stars,
    coins: updatedChild.coins,
    currentWorldKey: updatedChild.currentWorldKey,
    level: getLevel(updatedChild.stars),
    completedLevels: getCompletedLevels(updatedChild.stars)
  };
}
