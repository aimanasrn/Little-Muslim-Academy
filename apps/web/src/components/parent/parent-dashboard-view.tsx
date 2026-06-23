"use client";

import Link from "next/link";
import { worlds } from "../../data/game-content";
import { useParentOverview } from "./use-parent-overview";

function getWorldName(currentWorldKey: string | null) {
  return worlds.find((world) => world.slug === currentWorldKey)?.name ?? "Huruf Island";
}

export function ParentDashboardView() {
  const { data, error, isFetching } = useParentOverview();
  const activeChild = data?.activeChild;

  if (isFetching) {
    return <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">Loading parent dashboard...</div>;
  }

  if (error || !data || !activeChild) {
    return (
      <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
        <p className="text-lg font-bold text-ink">{error ?? "No child profile found yet."}</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-peach/70 via-white to-sky/50 p-6 shadow-cloud md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">Parent Dashboard</p>
            <h1 className="text-4xl font-black text-ink md:text-5xl">
              Track progress without losing the playful game feeling.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/75">
              View your child&apos;s stars, progress, payment access, and jump back into the world map with one tap.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/game" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
                Continue Game
              </Link>
              <Link
                href="/children"
                className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink"
              >
                View Child Profile
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Lifetime Access</p>
              <p className="mt-2 text-2xl font-black text-ink">{data.paymentStatus}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Stars Earned</p>
              <p className="mt-2 text-2xl font-black text-ink">{activeChild.stars}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Unlocked Worlds</p>
              <p className="mt-2 text-2xl font-black text-ink">{activeChild.unlockedWorlds}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Levels Finished</p>
              <p className="mt-2 text-2xl font-black text-ink">{activeChild.completedLevels}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Active Child</p>
          <div className="mt-4 rounded-[1.5rem] bg-cream px-4 py-4">
            <h2 className="text-xl font-black text-ink">{activeChild.name}</h2>
            <p className="mt-2 text-sm leading-7 text-ink/75">
              Currently exploring {getWorldName(activeChild.currentWorldKey)} with {activeChild.coins} coins saved.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Quick Actions</p>
          <div className="mt-4 grid gap-3">
            <Link href="/child-profile" className="rounded-[1.5rem] bg-sky/50 px-5 py-5">
              <p className="text-xl font-black text-ink">Open child profile</p>
              <p className="mt-2 text-sm leading-7 text-ink/70">See level, coins, and current world.</p>
            </Link>
            <Link href="/game/badges" className="rounded-[1.5rem] bg-mint/60 px-5 py-5">
              <p className="text-xl font-black text-ink">Check badge collection</p>
              <p className="mt-2 text-sm leading-7 text-ink/70">Celebrate reward progress together.</p>
            </Link>
            <Link href="/pricing" className="rounded-[1.5rem] bg-peach/55 px-5 py-5">
              <p className="text-xl font-black text-ink">Review payment plan</p>
              <p className="mt-2 text-sm leading-7 text-ink/70">Keep the lifetime access flow visible.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
