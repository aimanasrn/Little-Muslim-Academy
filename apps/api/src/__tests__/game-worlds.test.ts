import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../app.js";

describe("GET /game-worlds", () => {
  it("returns semi-open preview-aware worlds", async () => {
    const response = await request(createApp()).get("/game-worlds");

    expect(response.status).toBe(200);
    expect(response.body.worlds).toHaveLength(6);
    expect(response.body.worlds[0].key).toBe("huruf-island");
  });
});
