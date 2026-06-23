import Link from "next/link";
import { ProtectedView } from "../../../../components/auth/protected-view";
import { SessionBanner } from "../../../../components/auth/session-banner";
import { SiteShell } from "../../../../components/layout/site-shell";

export default function RewardResultPage() {
  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView requireLifetimeAccess>
      <main className="space-y-6">
        <section className="rounded-[2rem] bg-gradient-to-br from-sun/80 via-white to-peach/60 p-6 shadow-cloud md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">
              Reward Result
            </p>
            <h1 className="mt-3 text-4xl font-black text-ink md:text-6xl">
              Level complete. Three shining stars earned.
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink/75">
              Confetti, badge rewards, and a new adventure path are ready for your child.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Star 1", "Star 2", "Star 3"].map((star) => (
              <div key={star} className="rounded-[1.75rem] bg-white/85 px-5 py-8 text-center">
                <p className="text-2xl font-black text-ink">{star}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/game/badges" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
              View New Badge
            </Link>
            <Link
              href="/game"
              className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink"
            >
              Back to Map
            </Link>
          </div>
        </section>
      </main>
      </ProtectedView>
    </SiteShell>
  );
}
