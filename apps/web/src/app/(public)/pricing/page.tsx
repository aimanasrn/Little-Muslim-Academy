import Link from "next/link";
import { CheckoutButton } from "../../../components/forms/checkout-button";
import { SiteShell } from "../../../components/layout/site-shell";

const planFeatures = [
  "All six learning worlds",
  "Saved child stars, coins, and level progress",
  "Parent dashboard with badges and completed levels",
  "Admin-ready foundation for future content control",
  "Preview worlds stay open for guests before payment"
] as const;

export default function PricingPage() {
  return (
    <SiteShell>
      <main className="space-y-6">
        <section className="rounded-[2.3rem] bg-gradient-to-br from-sun/85 via-cream to-peach/80 p-6 shadow-cloud md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
                Lifetime access
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.03] text-ink md:text-6xl">
                One payment opens the full learning adventure for your family.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/72">
                This is not a monthly course portal. It is a preschool game-style learning world with
                unlockable paths, progress rewards, and parent visibility built into one access plan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/signup" className="rounded-full bg-ink px-6 py-4 text-sm font-extrabold text-white">
                  Create account first
                </Link>
                <Link
                  href="/game/huruf-island"
                  className="rounded-full border border-ink/10 bg-white/82 px-6 py-4 text-sm font-extrabold text-ink"
                >
                  Try demo world
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/84 p-6 shadow-cloud">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
                Family plan
              </p>
              <div className="mt-4 flex items-end gap-3">
                <p className="text-5xl font-black text-ink">RM 149</p>
                <p className="pb-2 text-sm font-bold text-ink/55">one time</p>
              </div>
              <p className="mt-2 text-sm font-bold text-ink/60">
                Gateway-ready placeholder flow for local development
              </p>

              <div className="mt-6 space-y-3">
                {planFeatures.map((feature) => (
                  <div key={feature} className="rounded-[1.4rem] bg-cream px-4 py-4 text-sm font-bold text-ink/78">
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <CheckoutButton />
                <p className="text-sm font-bold text-ink/60">
                  Sign in first so checkout can connect to your local parent account.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-white/84 p-6 shadow-cloud">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
              Included experience
            </p>
            <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">
              A game-first learning product, not a module list.
            </h2>
            <p className="mt-4 text-base leading-8 text-ink/72">
              Children move through worlds like Huruf Island, Story Forest, and Writing Garden,
              while parents follow real progress, rewards, and unlocked content from one place.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white/84 p-5 shadow-cloud">
              <h3 className="text-2xl font-black text-ink">What parents unlock</h3>
              <p className="mt-3 text-base leading-7 text-ink/72">
                Full game access, saved local database progress, child profiles, and a parent dashboard with stars and badges.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white/84 p-5 shadow-cloud">
              <h3 className="text-2xl font-black text-ink">What children feel</h3>
              <p className="mt-3 text-base leading-7 text-ink/72">
                Big buttons, cheerful colors, playful goals, reward screens, and worlds that feel like a learning map.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white/84 p-5 shadow-cloud">
              <h3 className="text-2xl font-black text-ink">Why preview matters</h3>
              <p className="mt-3 text-base leading-7 text-ink/72">
                Families can test selected demo worlds before paying, which makes the project easier to trust and easier to explain.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white/84 p-5 shadow-cloud">
              <h3 className="text-2xl font-black text-ink">Current dev flow</h3>
              <p className="mt-3 text-base leading-7 text-ink/72">
                Sign up or sign in, then continue to checkout. The current gateway is a local placeholder redirect for development.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
