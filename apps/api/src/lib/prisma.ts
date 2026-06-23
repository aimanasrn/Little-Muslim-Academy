import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../../../node_modules/.prisma/client/default.js";
import { env } from "../config/env.js";

let prismaClient: PrismaClient | null = null;

export function getPrisma() {
  if (!prismaClient) {
    if (!env.databaseUrl) {
      throw new Error("DATABASE_URL is not configured");
    }

    const databaseUrl = new URL(env.databaseUrl);
    const adapter = new PrismaMariaDb({
      host: databaseUrl.hostname,
      port: Number(databaseUrl.port || 3306),
      user: decodeURIComponent(databaseUrl.username),
      password: decodeURIComponent(databaseUrl.password),
      database:
        databaseUrl.pathname.startsWith("/")
          ? databaseUrl.pathname.slice(1)
          : databaseUrl.pathname
    });

    prismaClient = new PrismaClient({ adapter });
  }

  return prismaClient;
}
