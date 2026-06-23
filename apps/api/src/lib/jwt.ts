import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type JwtPayload = {
  userId: string;
  role: string;
  exp: number;
};

const localDevelopmentJwtSecret = randomBytes(32).toString("hex");

function getJwtSecret() {
  if (env.jwtSecret) {
    return env.jwtSecret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set in production");
  }

  return localDevelopmentJwtSecret;
}

export function signJwt(payload: { userId: string; role: string }) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    const payload = jwt.verify(token, getJwtSecret());

    if (
      typeof payload !== "object" ||
      payload === null ||
      typeof payload.userId !== "string" ||
      typeof payload.role !== "string" ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    return payload as JwtPayload;
  } catch {
    return null;
  }
}
