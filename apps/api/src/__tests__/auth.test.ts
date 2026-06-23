import jwt from "jsonwebtoken";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { env } from "../config/env.js";

describe("POST /auth/signin", () => {
  it("returns a jwt-shaped response for seeded parent credentials", async () => {
    const response = await request(createApp()).post("/auth/signin").send({
      email: "parent@example.com",
      password: "password123"
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user.role).toBe("parent");
    expect(jwt.verify(response.body.token, env.jwtSecret)).toMatchObject({
      userId: "user_parent_demo",
      role: "parent"
    });
  });
});
