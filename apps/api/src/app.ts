import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { authRouter } from "./modules/auth/routes.js";
import { gameWorldsRouter } from "./modules/game-worlds/routes.js";
import { healthRouter } from "./modules/health/routes.js";
import { parentRouter } from "./modules/parent/routes.js";
import { paymentsRouter } from "./modules/payments/routes.js";

export function createApp() {
  const app = express();

  app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && origin === env.webOrigin) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Vary", "Origin");
    }

    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.use(express.json());
  app.use(authRouter);
  app.use(gameWorldsRouter);
  app.use(healthRouter);
  app.use(parentRouter);
  app.use(paymentsRouter);
  app.use(errorHandler);

  return app;
}
