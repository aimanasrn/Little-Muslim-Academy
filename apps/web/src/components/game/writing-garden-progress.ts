export type GardenPoint = {
  x: number;
  y: number;
};

export type TraceProgressInput = {
  checkpoints: GardenPoint[];
  strokePoints: GardenPoint[];
  radius: number;
  completionThreshold?: number;
};

export type TraceProgressResult = {
  coveredCount: number;
  totalCheckpoints: number;
  progress: number;
  isComplete: boolean;
};

export function measureTraceProgress({
  checkpoints,
  strokePoints,
  radius,
  completionThreshold = 0.82
}: TraceProgressInput): TraceProgressResult {
  if (checkpoints.length === 0) {
    return {
      coveredCount: 0,
      totalCheckpoints: 0,
      progress: 0,
      isComplete: false
    };
  }

  const radiusSquared = radius * radius;
  let coveredCount = 0;

  for (const checkpoint of checkpoints) {
    const isCovered = strokePoints.some((point) => {
      const dx = checkpoint.x - point.x;
      const dy = checkpoint.y - point.y;

      return dx * dx + dy * dy <= radiusSquared;
    });

    if (isCovered) {
      coveredCount += 1;
    }
  }

  const progress = coveredCount / checkpoints.length;

  return {
    coveredCount,
    totalCheckpoints: checkpoints.length,
    progress,
    isComplete: progress >= completionThreshold
  };
}
