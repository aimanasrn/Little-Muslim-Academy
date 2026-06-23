import { config as loadEnv } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));

loadEnv({ path: resolve(currentDir, "../../../../.env") });
loadEnv();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  webOrigin: process.env.WEB_ORIGIN?.trim() || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET?.trim() ?? "",
  databaseUrl: process.env.DATABASE_URL ?? ""
};
