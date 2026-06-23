import Link from "next/link";
import type { GameWorldCard } from "../../lib/worlds";

export function WorldCard({
  world,
  locked = false
}: {
  world: GameWorldCard;
  locked?: boolean;
}) {
  return (
    <article className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-cloud">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/55">
            {world.shortLabel}
          </p>
          <h3 className="mt-2 text-2xl font-black text-ink">{world.name}</h3>
        </div>
        <span className="rounded-full bg-cream px-3 py-1 text-sm font-bold text-ink">
          {locked ? "Locked" : "Open"}
        </span>
      </div>
      <p className="mt-3 text-base leading-7 text-ink/75">{world.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-sky/50 px-3 py-2 text-sm font-semibold text-ink">
          Mission: {world.mission}
        </span>
        <span className="rounded-full bg-sun/80 px-3 py-2 text-sm font-semibold text-ink">
          Reward: {world.reward}
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-ink/60">{world.theme}</span>
        <Link
          href={locked ? "/pricing" : `/game/${world.slug}`}
          className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
        >
          {locked ? (world.previewEnabled ? "Preview Plan" : "Unlock Path") : "Play World"}
        </Link>
      </div>
    </article>
  );
}
