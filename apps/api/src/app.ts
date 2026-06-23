import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import { authRouter } from "./modules/auth/routes.js";
import { gameWorldsRouter } from "./modules/game-worlds/routes.js";
import { healthRouter } from "./modules/health/routes.js";
import { paymentsRouter } from "./modules/payments/routes.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(authRouter);
  app.use(gameWorldsRouter);
  app.use(healthRouter);
  app.use(paymentsRouter);
  app.use(errorHandler);

  return app;
}
