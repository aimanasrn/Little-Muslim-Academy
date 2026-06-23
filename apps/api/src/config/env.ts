export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET?.trim() ?? "",
  databaseUrl: process.env.DATABASE_URL ?? ""
};
