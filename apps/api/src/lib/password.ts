import { createHash, timingSafeEqual } from "node:crypto";

function digestPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export function hashPassword(password: string) {
  return digestPassword(password);
}

export function verifyPassword(password: string, hash: string) {
  const passwordBuffer = Buffer.from(digestPassword(password));
  const hashBuffer = Buffer.from(hash);

  if (passwordBuffer.length !== hashBuffer.length) {
    return false;
  }

  return timingSafeEqual(passwordBuffer, hashBuffer);
}
