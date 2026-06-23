import { ProgressPath } from "../../../components/game/progress-path";
import { WorldCard } from "../../../components/game/world-card";
import { ProtectedView } from "../../../components/auth/protected-view";
import { SessionBanner } from "../../../components/auth/session-banner";
import { childProfile } from "../../../data/game-content";
import { SiteShell } from "../../../components/layout/site-shell";
import { getWorldCards } from "../../../lib/worlds";

export default async function GameHomeMapPage() {
  const worlds = await getWorldCards();

  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView requireLifetimeAccess>
      <main className="space-y-6">
        <section className="rounded-[2rem] bg-gradient-to-br from-sky via-white to-mint/70 p-6 shadow-cloud md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">
                Game Home Map
              </p>
              <h1 className="text-4xl font-black text-ink md:text-6xl">
                Welcome back, {childProfile.name}. Your next adventure path is ready.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink/75">
                Follow the island trail, collect stars, unlock new worlds, and keep learning
                through joyful mini games.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white/85 p-5">
                <p className="text-sm font-bold text-ink/55">Stars</p>
                <p className="mt-2 text-3xl font-black text-ink">{childProfile.stars}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/85 p-5">
                <p className="text-sm font-bold text-ink/55">Coins</p>
                <p className="mt-2 text-3xl font-black text-ink">{childProfile.coins}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/85 p-5">
                <p className="text-sm font-bold text-ink/55">Level</p>
                <p className="mt-2 text-3xl font-black text-ink">{childProfile.level}</p>
              </div>
            </div>
          </div>
        </section>

        <ProgressPath worlds={worlds} />

        <section className="grid gap-6 xl:grid-cols-2">
          {worlds.map((world) => (
            <WorldCard key={world.slug} world={world} locked={!world.unlocked} />
          ))}
        </section>
      </main>
      </ProtectedView>
    </SiteShell>
  );
}
