"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { worlds } from "../../data/game-content";
import { useChildProgressPersistence } from "./child-progress-persistence";
import type { GardenPoint } from "./writing-garden-progress";
import { measureTraceProgress } from "./writing-garden-progress";

type GuideStroke = {
  points: GardenPoint[];
  dotted?: boolean;
};

type WritingLesson = {
  id: string;
  latin: string;
  arabic: string;
  word: string;
  celebration: string;
  strokes: GuideStroke[];
  palette: string;
};

const BOARD_SIZE = 360;
const CHECKPOINT_GAP = 18;
const TRACE_RADIUS = 26;
const COMPLETION_THRESHOLD = 0.84;

const LESSONS: WritingLesson[] = [
  {
    id: "alif",
    latin: "Alif",
    arabic: "ا",
    word: "Asad",
    celebration: "The sunflower stem stands tall.",
    palette: "from-sun/80 via-white to-mint/70",
    strokes: [
      {
        points: [
          { x: 178, y: 72 },
          { x: 180, y: 118 },
          { x: 182, y: 168 },
          { x: 182, y: 218 },
          { x: 180, y: 272 }
        ]
      }
    ]
  },
  {
    id: "ba",
    latin: "Ba",
    arabic: "ب",
    word: "Bayt",
    celebration: "A berry blossom pops under the path.",
    palette: "from-sky/70 via-white to-peach/70",
    strokes: [
      {
        points: [
          { x: 102, y: 190 },
          { x: 134, y: 198 },
          { x: 176, y: 204 },
          { x: 228, y: 204 },
          { x: 266, y: 194 },
          { x: 286, y: 176 },
          { x: 276, y: 162 },
          { x: 244, y: 156 },
          { x: 192, y: 156 },
          { x: 142, y: 164 },
          { x: 108, y: 178 }
        ]
      },
      {
        points: [
          { x: 190, y: 254 },
          { x: 190, y: 254 }
        ],
        dotted: true
      }
    ]
  },
  {
    id: "ta",
    latin: "Ta",
    arabic: "ت",
    word: "Tuffah",
    celebration: "Two tulips bloom above the letter.",
    palette: "from-peach/70 via-white to-sun/75",
    strokes: [
      {
        points: [
          { x: 102, y: 206 },
          { x: 140, y: 212 },
          { x: 184, y: 214 },
          { x: 236, y: 208 },
          { x: 276, y: 194 },
          { x: 290, y: 176 },
          { x: 278, y: 160 },
          { x: 244, y: 152 },
          { x: 194, y: 152 },
          { x: 144, y: 160 },
          { x: 108, y: 176 }
        ]
      },
      {
        points: [
          { x: 162, y: 118 },
          { x: 162, y: 118 }
        ],
        dotted: true
      },
      {
        points: [
          { x: 222, y: 118 },
          { x: 222, y: 118 }
        ],
        dotted: true
      }
    ]
  }
];

const LESSON_CHECKPOINTS = LESSONS.map((lesson) => createCheckpoints(lesson.strokes));

function createCheckpoints(strokes: GuideStroke[]) {
  return strokes.flatMap((stroke) => sampleStroke(stroke.points, stroke.dotted ? 1 : CHECKPOINT_GAP));
}

function sampleStroke(points: GardenPoint[], gap: number) {
  if (points.length === 0) {
    return [];
  }

  if (points.length === 1 || gap <= 1) {
    return points.map((point) => ({ ...point }));
  }

  const sampled: GardenPoint[] = [{ ...points[0]! }];

  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1]!;
    const end = points[index]!;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.hypot(dx, dy);

    if (distance === 0) {
      sampled.push({ ...end });
      continue;
    }

    const steps = Math.max(1, Math.ceil(distance / gap));

    for (let step = 1; step <= steps; step += 1) {
      const progress = step / steps;
      sampled.push({
        x: start.x + dx * progress,
        y: start.y + dy * progress
      });
    }
  }

  return sampled;
}

function toPolyline(points: GardenPoint[]) {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

function flattenStrokes(strokes: GardenPoint[][]) {
  return strokes.flatMap((stroke) => stroke);
}

function clampPercentage(value: number) {
  return Math.min(100, Math.max(0, Math.round(value * 100)));
}

function getRewardMessage(progress: number, isComplete: boolean) {
  if (isComplete) {
    return "Garden grown! You earned a flower cheer.";
  }

  if (progress >= 0.66) {
    return "Almost there. Follow the sparkles to the finish.";
  }

  if (progress >= 0.33) {
    return "Nice tracing. Keep your pen on the dotted path.";
  }

  return "Touch the path and slowly trace the glowing line.";
}

function getStarCount(progress: number, isComplete: boolean) {
  if (isComplete) {
    return 3;
  }

  if (progress >= 0.66) {
    return 2;
  }

  if (progress >= 0.25) {
    return 1;
  }

  return 0;
}

export function WritingGardenGame() {
  const world = worlds[3]!;
  const boardId = useId();
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [strokes, setStrokes] = useState<GardenPoint[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const { notice, saveWorldProgress } = useChildProgressPersistence();

  const lesson = LESSONS[activeLessonIndex]!;
  const checkpoints = LESSON_CHECKPOINTS[activeLessonIndex]!;
  const trace = measureTraceProgress({
    checkpoints,
    strokePoints: flattenStrokes(strokes),
    radius: TRACE_RADIUS,
    completionThreshold: COMPLETION_THRESHOLD
  });
  const progressPercent = clampPercentage(trace.progress);
  const stars = getStarCount(trace.progress, trace.isComplete);
  const completedLetters = completedLessonIds.length;

  function resetBoard() {
    setStrokes([]);
    setIsDrawing(false);
  }

  function moveToLesson(nextIndex: number) {
    setActiveLessonIndex(nextIndex);
    setStrokes([]);
    setIsDrawing(false);
  }

  function markLessonComplete(nextLessonId: string) {
    setCompletedLessonIds((current) => {
      if (current.includes(nextLessonId)) {
        return current;
      }

      const nextCompletedLessonIds = [...current, nextLessonId];

      if (nextCompletedLessonIds.length === LESSONS.length) {
        void saveWorldProgress({
          completionKey: "writing-garden-complete",
          earnedStars: 3,
          earnedCoins: 30,
          currentWorldKey: "writing-garden"
        });
      }

      return nextCompletedLessonIds;
    });
  }

  function getPointFromEvent(event: React.PointerEvent<HTMLDivElement>): GardenPoint | null {
    const board = boardRef.current;

    if (!board) {
      return null;
    }

    const rect = board.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) {
      return null;
    }

    return {
      x: ((event.clientX - rect.left) / rect.width) * BOARD_SIZE,
      y: ((event.clientY - rect.top) / rect.height) * BOARD_SIZE
    };
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const point = getPointFromEvent(event);

    if (!point) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDrawing(true);
    setStrokes((current) => [...current, [point]]);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDrawing) {
      return;
    }

    const point = getPointFromEvent(event);

    if (!point) {
      return;
    }

    setStrokes((current) => {
      if (current.length === 0) {
        return [[point]];
      }

      const next = [...current];
      const lastStroke = next[next.length - 1];

      next[next.length - 1] = [...lastStroke!, point];
      return next;
    });
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDrawing(false);

    if (trace.isComplete) {
      markLessonComplete(lesson.id);
    }
  }

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-mint/70 via-white to-sky/70 p-6 shadow-cloud md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">{world.name}</p>
            <h1 className="text-4xl font-black text-ink md:text-5xl">
              Trace each Arabic letter and grow your flower path.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/75">
              Follow the glowing line, lift your finger gently, and watch the garden bloom with every
              careful stroke.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full bg-white/85 px-5 py-3 text-sm font-bold text-ink shadow-sm">
                Mission: {world.mission}
              </div>
              <div className="rounded-full bg-sun/80 px-5 py-3 text-sm font-bold text-ink shadow-sm">
                Reward: {world.reward}
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white/80 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Mission Card</p>
            <div className="mt-4 space-y-4 rounded-[1.5rem] bg-cream p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-ink/55">Now tracing</p>
                  <p className="text-3xl font-black text-ink">
                    {lesson.latin} <span className="text-ink/45">({lesson.arabic})</span>
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white px-4 py-3 text-center shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/45">Garden Stars</p>
                  <p className="mt-1 text-2xl font-black text-ink">{stars}/3</p>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-white px-4 py-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 text-sm font-bold text-ink/60">
                  <span>Flower path progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="mt-3 rounded-full bg-cream p-2">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-mint via-sun to-peach transition-all duration-300"
                    style={{ width: `${Math.max(progressPercent, 6)}%` }}
                  />
                </div>
              </div>
              <p className="rounded-[1.5rem] bg-mint/70 px-4 py-4 text-base font-semibold text-ink">
                {getRewardMessage(trace.progress, trace.isComplete)}
              </p>
              {notice.message ? (
                <p
                  className={`rounded-[1.5rem] px-4 py-4 text-sm font-semibold ${
                    notice.tone === "error"
                      ? "bg-peach/80 text-ink"
                      : notice.tone === "success"
                        ? "bg-white text-ink"
                        : "bg-white/85 text-ink/75"
                  }`}
                >
                  {notice.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-6">
          <article className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Letter Patch</p>
                <h2 className="text-3xl font-black text-ink">Pick a flower row</h2>
              </div>
              <span className="rounded-full bg-peach/80 px-4 py-2 text-sm font-bold text-ink">
                {completedLetters}/{LESSONS.length} grown
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {LESSONS.map((item, index) => {
                const isActive = index === activeLessonIndex;
                const isDone = completedLessonIds.includes(item.id) || (isActive && trace.isComplete);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => moveToLesson(index)}
                    className={`rounded-[1.5rem] border px-4 py-4 text-left transition-transform hover:-translate-y-0.5 ${
                      isActive
                        ? "border-transparent bg-gradient-to-r from-sky/80 via-white to-mint/75 shadow-sm"
                        : "border-white bg-cream"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
                          Letter {index + 1}
                        </p>
                        <p className="mt-1 text-2xl font-black text-ink">
                          {item.latin} <span className="text-ink/45">{item.arabic}</span>
                        </p>
                        <p className="mt-1 text-sm font-semibold text-ink/70">Word buddy: {item.word}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-2 text-sm font-bold ${
                          isDone ? "bg-sun/85 text-ink" : "bg-white text-ink/60"
                        }`}
                      >
                        {isDone ? "Bloomed" : isActive ? "Tracing" : "Ready"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">How To Play</p>
            <div className="mt-4 space-y-3 text-base leading-7 text-ink/75">
              <p>1. Put your finger or mouse on the glowing path.</p>
              <p>2. Trace slowly until the flower meter fills up.</p>
              <p>3. Tap reset anytime if you want a fresh garden bed.</p>
            </div>
            <Link
              href="/game/rewards"
              className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
            >
              Visit Reward Garden
            </Link>
          </article>
        </div>

        <article className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Tracing Board</p>
              <h2 className="text-3xl font-black text-ink">
                Draw {lesson.latin} <span className="text-ink/45">{lesson.arabic}</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetBoard}
                className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-bold text-ink"
              >
                Reset Path
              </button>
              <button
                type="button"
                onClick={() => moveToLesson((activeLessonIndex + 1) % LESSONS.length)}
                className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
              >
                Next Letter
              </button>
            </div>
          </div>

          <div className={`mt-5 rounded-[1.75rem] bg-gradient-to-br ${lesson.palette} p-4 md:p-5`}>
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div
                ref={boardRef}
                role="img"
                aria-labelledby={`${boardId}-title ${boardId}-desc`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                onPointerLeave={handlePointerEnd}
                className="relative aspect-square touch-none overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 shadow-sm"
              >
                <span id={`${boardId}-title`} className="sr-only">
                  Writing board for tracing {lesson.latin}
                </span>
                <span id={`${boardId}-desc`} className="sr-only">
                  Trace the dotted letter path to fill the progress bar and earn a flower reward.
                </span>

                <svg viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`} className="absolute inset-0 h-full w-full">
                  <defs>
                    <pattern
                      id={`${boardId}-grid`}
                      width="36"
                      height="36"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(23,50,77,0.06)" strokeWidth="1" />
                    </pattern>
                  </defs>

                  <rect width={BOARD_SIZE} height={BOARD_SIZE} fill={`url(#${boardId}-grid)`} />

                  {lesson.strokes.map((stroke, index) =>
                    stroke.dotted ? (
                      <circle
                        key={`${lesson.id}-guide-${index}`}
                        cx={stroke.points[0]!.x}
                        cy={stroke.points[0]!.y}
                        r="18"
                        fill="rgba(255, 208, 191, 0.5)"
                        stroke="rgba(23,50,77,0.25)"
                        strokeDasharray="5 6"
                        strokeWidth="3"
                      />
                    ) : (
                      <polyline
                        key={`${lesson.id}-guide-${index}`}
                        points={toPolyline(stroke.points)}
                        fill="none"
                        stroke="rgba(23,50,77,0.2)"
                        strokeDasharray="10 10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="28"
                      />
                    )
                  )}

                  {checkpoints.map((point, index) => (
                    <circle
                      key={`${lesson.id}-sparkle-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="rgba(255, 227, 139, 0.95)"
                    />
                  ))}

                  {strokes.map((stroke, index) => (
                    <polyline
                      key={`${lesson.id}-trace-${index}`}
                      points={toPolyline(stroke)}
                      fill="none"
                      stroke="rgba(93, 176, 146, 0.95)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="18"
                    />
                  ))}
                </svg>

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-ink shadow-sm">
                  Trace me
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-sun/90 px-4 py-2 text-sm font-bold text-ink shadow-sm">
                  {lesson.arabic}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] bg-white/85 p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Reward Feedback</p>
                  <p className="mt-3 text-2xl font-black text-ink">
                    {trace.isComplete ? "Garden bloomed!" : "Keep tracing!"}
                  </p>
                  <p className="mt-2 text-base leading-7 text-ink/75">
                    {trace.isComplete ? lesson.celebration : "The more checkpoints you cover, the brighter the flowers grow."}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <span
                        key={`${lesson.id}-star-${index}`}
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          index < stars ? "bg-sun text-ink" : "bg-cream text-ink/40"
                        }`}
                      >
                        Star {index + 1}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-white/85 p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Stroke Tracker</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] bg-cream px-4 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/45">Checkpoints</p>
                      <p className="mt-2 text-2xl font-black text-ink">
                        {trace.coveredCount}/{trace.totalCheckpoints}
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] bg-mint/60 px-4 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/45">Brush Strokes</p>
                      <p className="mt-2 text-2xl font-black text-ink">{strokes.length}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-white/85 p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Mini Games In This World</p>
                  <div className="mt-4 grid gap-3">
                    {world.miniGames.map((game) => (
                      <div key={game} className="rounded-[1.25rem] bg-cream px-4 py-3 text-sm font-semibold text-ink">
                        {game}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
