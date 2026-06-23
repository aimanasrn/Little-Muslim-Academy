import Link from "next/link";
import { SignInForm } from "../../../components/forms/sign-in-form";
import { SiteShell } from "../../../components/layout/site-shell";

export default function SignInPage() {
  return (
    <SiteShell>
      <main className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-[2.2rem] bg-gradient-to-br from-sky/85 via-cream to-mint/75 p-6 shadow-cloud md:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
            Welcome back
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-black leading-[1.04] text-ink md:text-5xl">
            Sign in to continue your child&apos;s learning adventure.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-ink/72">
            Return to the map, continue saved progress, and reopen worlds, rewards, and badges
            from your parent account.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.6rem] bg-white/82 px-5 py-5">
              <p className="text-sm font-bold text-ink/55">Parent path</p>
              <p className="mt-2 text-lg font-black text-ink">Track stars, coins, badges, and child progress.</p>
            </div>
            <div className="rounded-[1.6rem] bg-white/82 px-5 py-5">
              <p className="text-sm font-bold text-ink/55">Admin path</p>
              <p className="mt-2 text-lg font-black text-ink">Manage worlds, levels, questions, and payments.</p>
            </div>
            <div className="rounded-[1.6rem] bg-white/82 px-5 py-5">
              <p className="text-sm font-bold text-ink/55">Preview still open</p>
              <p className="mt-2 text-lg font-black text-ink">Guests can still try selected demo worlds before paying.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2.2rem] bg-white/84 p-6 shadow-cloud md:p-8">
          <div className="max-w-xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
              Account access
            </p>
            <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">Open your saved session</h2>
            <p className="mt-3 text-base leading-8 text-ink/72">
              Use your own parent account or try the seeded local demo accounts while we continue building the full production flow.
            </p>

            <div className="mt-6 rounded-[1.8rem] bg-gradient-to-r from-sun/70 to-peach/65 p-5">
              <SignInForm />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white">
                Create parent account
              </Link>
              <Link
                href="/game/huruf-island"
                className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-extrabold text-ink"
              >
                Try preview first
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
