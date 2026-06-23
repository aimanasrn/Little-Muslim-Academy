import assert from "node:assert/strict";
import test from "node:test";
import { buildChildProgressUpdate, getPreviewProgressMessage } from "./child-progress-persistence";

test("buildChildProgressUpdate builds the next saved totals from the active child profile", () => {
  const update = buildChildProgressUpdate(
    {
      id: "child_123",
      name: "Amina",
      stars: 12,
      coins: 40,
      currentWorldKey: "story-forest",
      level: 2,
      completedLevels: 3,
      unlockedWorlds: 2
    },
    {
      earnedStars: 3,
      earnedCoins: 30,
      currentWorldKey: "huruf-island"
    }
  );

  assert.deepEqual(update, {
    childId: "child_123",
    payload: {
      childId: "child_123",
      starsEarned: 3,
      coinsEarned: 30,
      currentWorldKey: "story-forest"
    }
  });
});

test("getPreviewProgressMessage returns a gentle preview message for guest users", () => {
  assert.equal(
    getPreviewProgressMessage("guest"),
    "Preview mode is on, so this celebration stays in the demo and does not save yet."
  );
});
