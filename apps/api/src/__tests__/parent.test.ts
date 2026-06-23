import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";

describe("GET /parent/overview", () => {
  it("returns the signed-in parent's overview", async () => {
    const signInResponse = await request(createApp()).post("/auth/signin").send({
      email: "parent@example.com",
      password: "password123"
    });

    const response = await request(createApp())
      .get("/parent/overview")
      .set("authorization", `Bearer ${signInResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.paymentStatus).toBe("Lifetime access active");
    expect(response.body.activeChild.name).toBe("Amina");
    expect(response.body.childProfiles).toHaveLength(1);
  });
});

describe("POST /parent/progress", () => {
  it("adds stars and coins to the signed-in parent's child profile", async () => {
    const app = createApp();
    const signInResponse = await request(app).post("/auth/signin").send({
      email: "parent@example.com",
      password: "password123"
    });

    const beforeResponse = await request(app)
      .get("/parent/overview")
      .set("authorization", `Bearer ${signInResponse.body.token}`);

    const activeChild = beforeResponse.body.activeChild;

    const response = await request(app)
      .post("/parent/progress")
      .set("authorization", `Bearer ${signInResponse.body.token}`)
      .send({
        childId: activeChild.id,
        starsEarned: 3,
        coinsEarned: 30,
        currentWorldKey: "writing-garden"
      });

    expect(response.status).toBe(200);
    expect(response.body.child.stars).toBe(activeChild.stars + 3);
    expect(response.body.child.coins).toBe(activeChild.coins + 30);
    expect(response.body.child.currentWorldKey).toBe("writing-garden");
  });

  it("rejects invalid world keys", async () => {
    const app = createApp();
    const signInResponse = await request(app).post("/auth/signin").send({
      email: "parent@example.com",
      password: "password123"
    });

    const overviewResponse = await request(app)
      .get("/parent/overview")
      .set("authorization", `Bearer ${signInResponse.body.token}`);

    const response = await request(app)
      .post("/parent/progress")
      .set("authorization", `Bearer ${signInResponse.body.token}`)
      .send({
        childId: overviewResponse.body.activeChild.id,
        starsEarned: 1,
        coinsEarned: 10,
        currentWorldKey: "unknown-world"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("currentWorldKey is invalid");
  });
});
