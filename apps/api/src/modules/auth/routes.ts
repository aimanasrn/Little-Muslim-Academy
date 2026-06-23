import { Router } from "express";
import { signIn } from "./service.js";

export const authRouter = Router();

authRouter.post("/auth/signin", (req, res) => {
  const session = signIn(req.body.email, req.body.password);

  if (!session) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json(session);
});
