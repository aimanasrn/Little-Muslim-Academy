"use client";

import Link from "next/link";
import { useParentOverview } from "./use-parent-overview";

export function ChildrenPageView() {
  const { data, error, isFetching } = useParentOverview();
  const activeChild = data?.activeChild;

  if (isFetching) {
    return <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">Loading child profiles...</div>;
  }

  if (error || !data || !activeChild) {
    return (
      <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
        <p className="text-lg font-bold text-ink">{error ?? "No child profiles are available yet."}</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[2rem] bg-white/80 p-6 shadow-cloud md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Parent Area</p>
            <h1 className="text-4xl font-black text-ink">Manage Child Profiles</h1>
          </div>
          <Link href="/signup" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
            Add Another Child
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-sky/50 via-white to-mint/50 p-5">
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Active Child</p>
              <h2 className="mt-3 text-3xl font-black text-ink">{activeChild.name}</h2>
              <p className="mt-2 text-base leading-7 text-ink/75">
                Level {activeChild.level} learner with {activeChild.stars} stars and {activeChild.coins} coins.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/child-profile" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">
                  Open Profile
                </Link>
                <Link
                  href="/game"
                  className="rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-bold text-ink"
                >
                  Continue Game
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[1.5rem] bg-cream px-5 py-5">
              <p className="text-sm font-bold text-ink/55">Payment</p>
              <p className="mt-2 text-2xl font-black text-ink">{data.paymentStatus}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white px-5 py-5">
              <p className="text-sm font-bold text-ink/55">Completed Levels</p>
              <p className="mt-2 text-2xl font-black text-ink">{activeChild.completedLevels}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white px-5 py-5">
              <p className="text-sm font-bold text-ink/55">Unlocked Worlds</p>
              <p className="mt-2 text-2xl font-black text-ink">{activeChild.unlockedWorlds}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
