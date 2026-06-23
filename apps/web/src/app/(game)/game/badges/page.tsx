import { ProtectedView } from "../../../../components/auth/protected-view";
import { SessionBanner } from "../../../../components/auth/session-banner";
import { SiteShell } from "../../../../components/layout/site-shell";
import { badgeCollection } from "../../../../data/game-content";

export default function BadgeCollectionPage() {
  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView requireLifetimeAccess>
      <main className="space-y-6">
        <section className="rounded-[2rem] bg-white/80 p-6 shadow-cloud md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
            Badge Collection
          </p>
          <h1 className="mt-3 text-4xl font-black text-ink md:text-5xl">
            Every world gives a new reward to celebrate progress.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">
            Use this screen as the child-friendly trophy room for stars, coins, and unlocked badges.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {badgeCollection.map((badge, index) => (
            <article key={badge} className="rounded-[2rem] bg-gradient-to-br from-white to-cream p-6 shadow-cloud">
              <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
                Badge {index + 1}
              </span>
              <h2 className="mt-4 text-2xl font-black text-ink">{badge}</h2>
              <p className="mt-3 text-base leading-7 text-ink/70">
                Rewarded after finishing a world mission, collecting stars, and passing the final quiz.
              </p>
            </article>
          ))}
        </section>
      </main>
      </ProtectedView>
    </SiteShell>
  );
}
