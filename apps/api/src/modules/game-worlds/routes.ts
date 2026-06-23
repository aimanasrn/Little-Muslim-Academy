import { Router } from "express";
import { listWorlds } from "./service.js";

export const gameWorldsRouter = Router();

gameWorldsRouter.get("/game-worlds", async (_req, res) => {
  res.json({ worlds: await listWorlds() });
});
