import type { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../lib/jwt.js";

export type AuthenticatedRequest = Request & {
  auth?: {
    userId: string;
    role: string;
  };
};

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.header("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const payload = verifyJwt(authorization.slice("Bearer ".length));

  if (!payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.auth = {
    userId: payload.userId,
    role: payload.role
  };

  return next();
}
