import {
  APP_LANGUAGES,
  PAYMENT_STATUSES,
  USER_ROLES,
  WORLD_KEYS
} from "@little-muslim/shared";
import type {
  AppLanguage,
  LocalizedText,
  PaymentStatus,
  SignInInput,
  UserRole,
  WorldKey
} from "@little-muslim/shared";
import { describe, expect, expectTypeOf, it } from "vitest";

describe("shared contracts", () => {
  it("exports runtime constants from each shared contract module", () => {
    expect(APP_LANGUAGES).toEqual(["ms", "en"]);
    expect(USER_ROLES).toEqual(["parent", "admin"]);
    expect(WORLD_KEYS).toEqual([
      "huruf-island",
      "story-forest",
      "kalimah-castle",
      "writing-garden",
      "doa-village",
      "picture-dictionary-zoo"
    ]);
    expect(PAYMENT_STATUSES).toEqual([
      "initiated",
      "pending",
      "paid",
      "failed",
      "expired",
      "refunded"
    ]);
  });

  it("exports type contracts for content, auth, game, i18n, payments, and validation", () => {
    expectTypeOf<AppLanguage>().toEqualTypeOf<"ms" | "en">();
    expectTypeOf<UserRole>().toEqualTypeOf<"parent" | "admin">();
    expectTypeOf<WorldKey>().toEqualTypeOf<
      | "huruf-island"
      | "story-forest"
      | "kalimah-castle"
      | "writing-garden"
      | "doa-village"
      | "picture-dictionary-zoo"
    >();
    expectTypeOf<PaymentStatus>().toEqualTypeOf<
      | "initiated"
      | "pending"
      | "paid"
      | "failed"
      | "expired"
      | "refunded"
    >();
    expectTypeOf<LocalizedText>().toEqualTypeOf<{
      ms: string;
      en: string;
    }>();
    expectTypeOf<SignInInput>().toEqualTypeOf<{
      email: string;
      password: string;
    }>();
  });
});
