import { WORLD_KEYS } from "@little-muslim/shared";
import { describe, expect, it } from "vitest";
import { seedWorldKeys } from "../../prisma/seed.js";

describe("seed coverage", () => {
  it("covers every defined world key", () => {
    expect(seedWorldKeys).toEqual(WORLD_KEYS);
  });
});
