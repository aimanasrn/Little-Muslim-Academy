import express from "express";
import { errorHandler } from "./middleware/error-handler";
import { healthRouter } from "./modules/health/routes";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(healthRouter);
  app.use(errorHandler);

  return app;
}
