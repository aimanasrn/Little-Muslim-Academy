import { Router } from "express";
import { signIn } from "./service.js";

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
