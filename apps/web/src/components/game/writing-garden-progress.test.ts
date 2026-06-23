import test from "node:test";
import assert from "node:assert/strict";

import { measureTraceProgress } from "./writing-garden-progress";

test("measureTraceProgress counts nearby checkpoints as covered", () => {
  const result = measureTraceProgress({
    checkpoints: [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 20, y: 0 },
      { x: 30, y: 0 }
    ],
    strokePoints: [
      { x: 1, y: 1 },
      { x: 11, y: -1 },
      { x: 29, y: 2 }
    ],
    radius: 4
  });

  assert.equal(result.coveredCount, 3);
  assert.equal(result.progress, 0.75);
  assert.equal(result.isComplete, false);
});

test("measureTraceProgress marks a trace complete once enough checkpoints are covered", () => {
  const result = measureTraceProgress({
    checkpoints: [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 20, y: 0 },
      { x: 30, y: 0 }
    ],
    strokePoints: [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 20, y: 0 },
      { x: 30, y: 0 }
    ],
    radius: 3,
    completionThreshold: 0.9
  });

  assert.equal(result.coveredCount, 4);
  assert.equal(result.progress, 1);
  assert.equal(result.isComplete, true);
});
