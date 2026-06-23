import type { NextFunction, Request, Response } from "express";

type RequestParseError = Error & {
  status?: number;
  type?: string;
};

export function errorHandler(
  error: RequestParseError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error.type === "entity.parse.failed" || error.status === 400) {
    return res.status(400).json({ message: "Malformed JSON" });
  }

  res.status(500).json({ message: error.message });
}
