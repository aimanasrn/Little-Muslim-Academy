import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "../config/env.js";

type JwtPayload = {
  userId: string;
  role: string;
  exp: number;
};

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signSegment(value: string) {
  return createHmac("sha256", env.jwtSecret).update(value).digest("base64url");
}

export function signJwt(payload: { userId: string; role: string }) {
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = encodeBase64Url(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    })
  );
  const unsignedToken = `${header}.${body}`;
  const signature = signSegment(unsignedToken);

  return `${unsignedToken}.${signature}`;
}

export function verifyJwt(token: string): JwtPayload | null {
  const [header, body, signature] = token.split(".");

  if (!header || !body || !signature) {
    return null;
  }

  const expectedSignature = signSegment(`${header}.${body}`);

  if (
    signature.length !== expectedSignature.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(body)) as JwtPayload;

    if (typeof payload.userId !== "string" || typeof payload.role !== "string") {
      return null;
    }

    if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
