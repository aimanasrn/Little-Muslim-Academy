import { Router } from "express";
import { createCheckout } from "./service.js";

export const paymentsRouter = Router();

paymentsRouter.post("/payments/checkout", (req, res) => {
  if (typeof req.body?.userId !== "string" || req.body.userId.trim() === "") {
    return res.status(400).json({ message: "userId is required" });
  }

  return res.json(createCheckout(req.body.userId));
});
