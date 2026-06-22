import { z } from "zod";

export const roleSchema = z.enum(["admin", "parent"]);
export const accessStateSchema = z.enum(["preview", "active"]);

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  preferredLanguage: z.enum(["ms", "en"]).default("ms")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export type Role = z.infer<typeof roleSchema>;
export type AccessState = z.infer<typeof accessStateSchema>;
export type RegisterInput = z.input<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
