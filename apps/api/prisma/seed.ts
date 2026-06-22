import "dotenv/config";

import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@littlemuslim.local" },
    update: {},
    create: {
      fullName: "Little Muslim Admin",
      email: "admin@littlemuslim.local",
      passwordHash,
      role: "admin",
      accessState: "active",
      preferredLanguage: "en"
    }
  });

  const parent = await prisma.user.upsert({
    where: { email: "parent@littlemuslim.local" },
    update: {},
    create: {
      fullName: "Sample Parent",
      email: "parent@littlemuslim.local",
      passwordHash,
      role: "parent",
      accessState: "preview",
      preferredLanguage: "ms"
    }
  });

  await prisma.childProfile.upsert({
    where: { id: "seed-child-profile-id" },
    update: {},
    create: {
      id: "seed-child-profile-id",
      userId: parent.id,
      displayName: "Aisyah"
    }
  });

  const hurufModule = await prisma.module.upsert({
    where: { slug: "huruf-learning" },
    update: {},
    create: {
      slug: "huruf-learning",
      titleMs: "Belajar Huruf",
      titleEn: "Huruf Learning",
      descriptionMs: "Kenali huruf Arab dan Jawi secara mesra kanak-kanak.",
      descriptionEn: "Friendly Arabic and Jawi letter learning for preschoolers.",
      isPreviewable: true
    }
  });

  await prisma.lesson.upsert({
    where: { slug: "alif-preview" },
    update: {},
    create: {
      moduleId: hurufModule.id,
      slug: "alif-preview",
      titleMs: "Huruf Alif",
      titleEn: "Letter Alif",
      descriptionMs: "Pengenalan awal huruf Alif dengan audio dan contoh perkataan.",
      descriptionEn: "Preview lesson for Alif with audio and example words.",
      isPreview: true,
      orderIndex: 1
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
