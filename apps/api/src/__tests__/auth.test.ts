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
    expect(response.body.user.email).toBe("parent@example.com");
    expect(response.body.user.role).toBe("parent");
    expect(response.body.user.hasLifetimeAccess).toBe(true);
    expect(verifyJwt(response.body.token)).toMatchObject({
      userId: expect.any(String),
      role: "parent"
    });
  });

  it("returns an admin session for seeded admin credentials", async () => {
    const response = await request(createApp()).post("/auth/signin").send({
      email: "admin@example.com",
      password: "password123"
    });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("admin@example.com");
    expect(response.body.user.role).toBe("admin");
    expect(verifyJwt(response.body.token)).toMatchObject({
      userId: expect.any(String),
      role: "admin"
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

  it("returns 400 for malformed json", async () => {
    const response = await request(createApp())
      .post("/auth/signin")
      .set("content-type", "application/json")
      .send('{"email":"parent@example.com","password":"password123"');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Malformed JSON" });
  });
});

describe("POST /auth/signup", () => {
  it("creates a new parent account and returns a session", async () => {
    const email = `new-parent-${Date.now()}@example.com`;
    const response = await request(createApp()).post("/auth/signup").send({
      email,
      password: "password123"
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(email);
    expect(response.body.user.role).toBe("parent");
    expect(response.body.user.hasLifetimeAccess).toBe(false);
    expect(verifyJwt(response.body.token)).toMatchObject({
      userId: expect.any(String),
      role: "parent"
    });
  });

  it("rejects duplicate emails", async () => {
    const response = await request(createApp()).post("/auth/signup").send({
      email: "parent@example.com",
      password: "password123"
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "An account with this email already exists" });
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

  it("returns 401 when the bearer token is invalid", async () => {
    const response = await request(createProtectedApp())
      .get("/protected")
      .set("authorization", "Bearer not-a-real-token");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });
});

describe("GET /auth/me", () => {
  it("returns the current signed in user for a valid token", async () => {
    const signInResponse = await request(createApp()).post("/auth/signin").send({
      email: "parent@example.com",
      password: "password123"
    });

    const response = await request(createApp())
      .get("/auth/me")
      .set("authorization", `Bearer ${signInResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toMatchObject({
      id: expect.any(String),
      email: "parent@example.com",
      role: "parent",
      hasLifetimeAccess: true
    });
  });
});
