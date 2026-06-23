"use client";

import Link from "next/link";
import { worlds } from "../../data/game-content";
import { useParentOverview } from "./use-parent-overview";

function getWorldName(currentWorldKey: string | null) {
  return worlds.find((world) => world.slug === currentWorldKey)?.name ?? "Huruf Island";
}

function getNextMission(currentWorldKey: string | null) {
  return (
    worlds.find((world) => world.slug === currentWorldKey)?.mission ??
    "Complete your next mini game to unlock more stars."
  );
}

export function ChildProfileView() {
  const { data, error, isFetching } = useParentOverview();
  const activeChild = data?.activeChild;

  if (isFetching) {
    return <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">Loading child profile...</div>;
  }

  if (error || !data || !activeChild) {
    return (
      <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
        <p className="text-lg font-bold text-ink">{error ?? "No child profile is available yet."}</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-mint via-white to-sky/60 p-6 shadow-cloud md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">Child Profile</p>
            <h1 className="text-4xl font-black text-ink md:text-5xl">{activeChild.name}</h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/75">
              Preschool adventurer, currently exploring {getWorldName(activeChild.currentWorldKey)}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/game" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
                Continue Adventure
              </Link>
              <Link
                href="/game/badges"
                className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink"
              >
                View Badges
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Level</p>
              <p className="mt-2 text-3xl font-black text-ink">{activeChild.level}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Stars</p>
              <p className="mt-2 text-3xl font-black text-ink">{activeChild.stars}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Unlocked Worlds</p>
              <p className="mt-2 text-3xl font-black text-ink">{activeChild.unlockedWorlds}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/85 p-5">
              <p className="text-sm font-bold text-ink/55">Coins</p>
              <p className="mt-2 text-3xl font-black text-ink">{activeChild.coins}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">Next Mission</p>
        <div className="mt-4 rounded-[1.5rem] bg-cream px-5 py-5">
          <p className="text-2xl font-black text-ink">{getNextMission(activeChild.currentWorldKey)}</p>
        </div>
      </section>
    </main>
  );
}
