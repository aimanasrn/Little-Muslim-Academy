import Link from "next/link";
import type { WorldSummary } from "../../data/game-content";

export function PlayPanel({ world }: { world: WorldSummary }) {
  return (
    <main className="space-y-6">
      <section className="rounded-[2rem] bg-white/80 p-6 shadow-cloud md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
              {world.name}
            </p>
            <h1 className="text-4xl font-black text-ink md:text-5xl">
              {world.description}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/75">{world.theme}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/game/quiz-battle"
                className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
              >
                Start Mission
              </Link>
              <button className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink">
                Play Sound
              </button>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-gradient-to-br from-sky/60 via-white to-mint/60 p-5">
            <div className="rounded-[1.5rem] bg-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
                Mission Goal
              </p>
              <p className="mt-3 text-2xl font-black text-ink">{world.mission}</p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-3xl bg-cream px-4 py-3 text-sm font-semibold text-ink">
                  Reward badge: {world.reward}
                </div>
                <div className="rounded-3xl bg-sun/80 px-4 py-3 text-sm font-semibold text-ink">
                  Earn 3 stars to unlock the next path
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
            Mini Games
          </p>
          <div className="mt-4 grid gap-3">
            {world.miniGames.map((game) => (
              <div key={game} className="rounded-[1.5rem] bg-cream px-4 py-4">
                <p className="text-lg font-bold text-ink">{game}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
            Play Screen Preview
          </p>
          <div className="mt-4 rounded-[1.75rem] bg-gradient-to-br from-peach/60 via-white to-sky/50 p-5">
            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.5rem] bg-white/80 p-4">
                <p className="text-sm font-bold text-ink/55">Teacher audio</p>
                <p className="mt-3 text-xl font-black text-ink">Tap what you hear</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-3xl bg-mint px-4 py-4 text-center text-2xl font-black text-ink">
                    Alif
                  </div>
                  <div className="rounded-3xl bg-sky/60 px-4 py-4 text-center text-2xl font-black text-ink">
                    Ba
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border-2 border-dashed border-ink/15 bg-white/70 p-4">
                <p className="text-sm font-bold text-ink/55">Reward meter</p>
                <div className="mt-4 rounded-full bg-cream p-2">
                  <div className="h-4 w-3/4 rounded-full bg-gradient-to-r from-sun to-peach" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-3xl bg-sun/80 px-3 py-4 text-center text-sm font-bold text-ink">
                    Star 1
                  </div>
                  <div className="rounded-3xl bg-sun/80 px-3 py-4 text-center text-sm font-bold text-ink">
                    Star 2
                  </div>
                  <div className="rounded-3xl bg-white px-3 py-4 text-center text-sm font-bold text-ink/40">
                    Locked
                  </div>
                </div>
                <Link
                  href="/game/rewards"
                  className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
                >
                  Finish Level
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
