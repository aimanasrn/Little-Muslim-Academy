import { Router } from "express";
import { WORLD_KEYS } from "@little-muslim/shared";
import { requireAuth, type AuthenticatedRequest } from "../../middleware/auth.js";
import { getParentOverview, updateChildProgress } from "./service.js";

export const parentRouter = Router();

parentRouter.get("/parent/overview", requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const role = req.auth?.role;

  if (role !== "parent" && role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const overview = await getParentOverview(userId);

  if (!overview) {
    return res.status(404).json({ message: "Parent overview not found" });
  }

  return res.json(overview);
});

parentRouter.post("/parent/progress", requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const role = req.auth?.role;

  if (role !== "parent" && role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { childId, starsEarned, coinsEarned, currentWorldKey } = req.body ?? {};

  if (typeof childId !== "string" || childId.trim() === "") {
    return res.status(400).json({ message: "childId is required" });
  }

  if (!Number.isInteger(starsEarned) || starsEarned < 0) {
    return res.status(400).json({ message: "starsEarned must be a non-negative integer" });
  }

  if (!Number.isInteger(coinsEarned) || coinsEarned < 0) {
    return res.status(400).json({ message: "coinsEarned must be a non-negative integer" });
  }

  if (
    currentWorldKey !== null &&
    currentWorldKey !== undefined &&
    (typeof currentWorldKey !== "string" ||
      !WORLD_KEYS.includes(currentWorldKey as (typeof WORLD_KEYS)[number]))
  ) {
    return res.status(400).json({ message: "currentWorldKey is invalid" });
  }

  const child = await updateChildProgress(userId, {
    childId,
    starsEarned,
    coinsEarned,
    currentWorldKey: typeof currentWorldKey === "string" ? currentWorldKey : null,
    allowAnyChild: role === "admin"
  });

  if (!child) {
    return res.status(404).json({ message: "Child profile not found" });
  }

  return res.json({ child });
});
