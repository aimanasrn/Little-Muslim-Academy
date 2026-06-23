import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";

describe("POST /payments/checkout", () => {
  it("returns a redirect placeholder payload", async () => {
    const response = await request(createApp()).post("/payments/checkout").send({
      userId: "user_parent_demo"
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("pending");
    expect(response.body.checkoutUrl).toContain("/payment/success");
  });
});
