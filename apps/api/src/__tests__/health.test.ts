import { APP_LANGUAGES } from "@little-muslim/shared";
import { describe, expect, it } from "vitest";

describe("shared contracts", () => {
  it("exports bilingual language constants", () => {
    expect(APP_LANGUAGES).toEqual(["ms", "en"]);
  });
});
