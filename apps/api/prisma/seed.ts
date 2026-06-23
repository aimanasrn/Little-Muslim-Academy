import "dotenv/config";
import { hashPassword } from "../src/lib/password.js";

export const seedWorldKeys = [
  "huruf-island",
  "story-forest",
  "kalimah-castle",
  "writing-garden",
  "doa-village",
  "picture-dictionary-zoo"
] as const;

const previewWorldKeys = new Set(["huruf-island", "picture-dictionary-zoo"]);

export async function runSeed() {
  const { getPrisma } = await import("../src/lib/prisma.js");
  const prisma = getPrisma();
  const passwordHash = await hashPassword("password123");

  const parentUser = await prisma.user.upsert({
    where: { email: "parent@example.com" },
    update: {
      role: "parent",
      passwordHash,
      hasLifetimeAccess: true,
      preferredLanguage: "ms"
    },
    create: {
      email: "parent@example.com",
      role: "parent",
      passwordHash,
      hasLifetimeAccess: true,
      preferredLanguage: "ms"
    }
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      role: "admin",
      passwordHash,
      hasLifetimeAccess: true,
      preferredLanguage: "en"
    },
    create: {
      email: "admin@example.com",
      role: "admin",
      passwordHash,
      hasLifetimeAccess: true,
      preferredLanguage: "en"
    }
  });

  await prisma.childProfile.upsert({
    where: { id: "child_amina_demo" },
    update: {
      userId: parentUser.id,
      name: "Amina",
      stars: 48,
      coins: 240,
      currentWorldKey: "story-forest"
    },
    create: {
      id: "child_amina_demo",
      userId: parentUser.id,
      name: "Amina",
      stars: 48,
      coins: 240,
      currentWorldKey: "story-forest"
    }
  });

  await prisma.payment.upsert({
    where: { id: "payment_lifetime_demo" },
    update: {
      userId: parentUser.id,
      provider: "manual",
      status: "paid",
      amountCents: 14900
    },
    create: {
      id: "payment_lifetime_demo",
      userId: parentUser.id,
      provider: "manual",
      status: "paid",
      amountCents: 14900
    }
  });

  await Promise.all(
    seedWorldKeys.map((key) =>
      prisma.gameWorld.upsert({
        where: { key },
        update: {
          titleMs: key,
          titleEn: key,
          previewEnabled: previewWorldKeys.has(key)
        },
        create: {
          key,
          titleMs: key,
          titleEn: key,
          previewEnabled: previewWorldKeys.has(key)
        }
      })
    )
  );
}

const invokedAsScript =
  process.argv[1] !== undefined &&
  import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href;

if (invokedAsScript) {
  runSeed()
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    })
    .finally(async () => {
      const { getPrisma } = await import("../src/lib/prisma.js");
      await getPrisma().$disconnect();
    });
}
