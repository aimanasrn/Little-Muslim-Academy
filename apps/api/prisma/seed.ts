import "dotenv/config";

export const seedWorldKeys = [
  "huruf-island",
  "story-forest",
  "kalimah-castle",
  "writing-garden",
  "doa-village",
  "picture-dictionary-zoo"
] as const;

export async function runSeed() {
  const { prisma } = await import("../src/lib/prisma.js");

  await Promise.all(
    seedWorldKeys.map((key, index) =>
      prisma.gameWorld.upsert({
        where: { key },
        update: {},
        create: {
          key,
          titleMs: key,
          titleEn: key,
          previewEnabled: index < 2
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
      const { prisma } = await import("../src/lib/prisma.js");
      await prisma.$disconnect();
    });
}
