import { Router } from "express";
import { listWorlds } from "./service.js";

export const gameWorldsRouter = Router();

gameWorldsRouter.get("/game-worlds", (_req, res) => {
  res.json({ worlds: listWorlds() });
});
