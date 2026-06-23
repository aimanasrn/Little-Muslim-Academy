import Link from "next/link";
import type { GameWorldCard } from "../../lib/worlds";

export function ProgressPath({ worlds }: { worlds: GameWorldCard[] }) {
  return (
    <div className="rounded-[2rem] bg-white/80 p-5 shadow-cloud">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
            Adventure Map
          </p>
          <h2 className="text-3xl font-black text-ink">Follow the star path</h2>
        </div>
        <Link href="/game/badges" className="rounded-full bg-sun px-4 py-2 text-sm font-bold text-ink">
          View Badges
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {worlds.map((world, index) => (
          <Link
            key={world.slug}
            href={world.unlocked ? `/game/${world.slug}` : "/pricing"}
            className="group rounded-[1.75rem] border border-white/75 bg-gradient-to-br from-white to-cream p-5 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
                Level {index + 1}
              </span>
              <span className="text-sm font-bold text-ink/60">
                {world.unlocked ? "Unlocked" : world.previewEnabled ? "Preview" : "Locked"}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-black text-ink">{world.name}</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">{world.theme}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink/70">
              <span className="rounded-full bg-mint px-3 py-2">{world.reward}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
