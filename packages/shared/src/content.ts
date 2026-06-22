import { z } from "zod";

export const publishStatusSchema = z.enum(["draft", "published", "archived"]);

export const moduleSlugSchema = z.enum([
  "huruf-learning",
  "cerita",
  "kalimah-islam",
  "menulis",
  "doa-harian",
  "kamus-bergambar",
  "quiz-practice"
]);

export type PublishStatus = z.infer<typeof publishStatusSchema>;
export type ModuleSlug = z.infer<typeof moduleSlugSchema>;
