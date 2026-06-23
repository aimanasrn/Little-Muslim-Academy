import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import { authRouter } from "./modules/auth/routes.js";
import { healthRouter } from "./modules/health/routes.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(authRouter);
  app.use(healthRouter);
  app.use(errorHandler);

  return app;
}
