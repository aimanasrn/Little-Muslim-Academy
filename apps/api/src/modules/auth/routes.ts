import { Router } from "express";
import { signIn } from "./service.js";

export const authRouter = Router();

authRouter.post("/auth/signin", async (req, res) => {
  const session = await signIn(req.body.email, req.body.password);

  if (!session) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json(session);
});
