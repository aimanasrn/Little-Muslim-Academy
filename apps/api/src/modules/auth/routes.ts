import { Router } from "express";
import { requireAuth, type AuthenticatedRequest } from "../../middleware/auth.js";
import { findCurrentUser, signIn, signUpParent } from "./service.js";

export const authRouter = Router();

authRouter.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const session = await signIn(email, password);

  if (!session) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json(session);
});

authRouter.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (password.trim().length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  const session = await signUpParent(email, password);

  if ("error" in session) {
    return res.status(409).json({ message: session.error });
  }

  return res.status(201).json(session);
});

authRouter.get("/auth/me", requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await findCurrentUser(userId);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ user });
});
