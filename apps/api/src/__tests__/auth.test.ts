import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { signJwt, verifyJwt } from "../lib/jwt.js";
import {
  requireAuth,
  type AuthenticatedRequest
} from "../middleware/auth.js";

describe("POST /auth/signin", () => {
  it("returns a jwt-shaped response for seeded parent credentials", async () => {
    const response = await request(createApp()).post("/auth/signin").send({
      email: "parent@example.com",
      password: "password123"
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user.role).toBe("parent");
    expect(verifyJwt(response.body.token)).toMatchObject({
      userId: "user_parent_demo",
      role: "parent"
    });
  });

  it("returns 401 for invalid credentials", async () => {
    const response = await request(createApp()).post("/auth/signin").send({
      email: "parent@example.com",
      password: "wrong-password"
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Invalid credentials" });
  });

  it("returns 400 for malformed request bodies", async () => {
    const response = await request(createApp()).post("/auth/signin").send({
      email: 123,
      password: { nope: true }
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Email and password are required" });
  });
});

describe("requireAuth", () => {
  function createProtectedApp() {
    const app = express();

    app.get("/protected", requireAuth, (req: AuthenticatedRequest, res) => {
      res.json({ auth: req.auth });
    });

    return app;
  }

  it("returns 401 when the authorization header is missing", async () => {
    const response = await request(createProtectedApp()).get("/protected");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });

  it("allows access with a valid bearer token", async () => {
    const token = signJwt({ userId: "user_parent_demo", role: "parent" });
    const response = await request(createProtectedApp())
      .get("/protected")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      auth: {
        userId: "user_parent_demo",
        role: "parent"
      }
    });
  });
});
