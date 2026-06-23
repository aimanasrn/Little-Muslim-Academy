import Link from "next/link";
import { SignUpForm } from "../../../components/forms/sign-up-form";
import { SiteShell } from "../../../components/layout/site-shell";

export default function SignUpPage() {
  return (
    <SiteShell>
      <main className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <section className="rounded-[2.2rem] bg-white/84 p-6 shadow-cloud md:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
            Parent sign up
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black leading-[1.04] text-ink md:text-5xl">
            Create your parent account and step into the learning adventure.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/72">
            This account unlocks the parent side of the platform, where you can check progress,
            manage child profiles, and continue into lifetime access checkout.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.6rem] bg-cream px-4 py-5">
              <p className="text-sm font-bold text-ink/55">Step 1</p>
              <p className="mt-2 text-lg font-black text-ink">Create parent login</p>
            </div>
            <div className="rounded-[1.6rem] bg-cream px-4 py-5">
              <p className="text-sm font-bold text-ink/55">Step 2</p>
              <p className="mt-2 text-lg font-black text-ink">Unlock lifetime access</p>
            </div>
            <div className="rounded-[1.6rem] bg-cream px-4 py-5">
              <p className="text-sm font-bold text-ink/55">Step 3</p>
              <p className="mt-2 text-lg font-black text-ink">Create child profile</p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.9rem] bg-gradient-to-br from-mint/70 via-white to-sky/70 p-5">
            <SignUpForm />
          </div>
        </section>

        <section className="rounded-[2.2rem] bg-gradient-to-br from-peach/80 via-cream to-sun/80 p-6 shadow-cloud md:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
            What happens next
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.6rem] bg-white/82 px-5 py-5">
              <h2 className="text-2xl font-black text-ink">A simpler family flow</h2>
              <p className="mt-3 text-base leading-7 text-ink/72">
                Parents enter first, then guide the child into a softer game world built for preschool learning.
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-white/82 px-5 py-5">
              <h3 className="text-xl font-black text-ink">Preview before paying</h3>
              <p className="mt-3 text-base leading-7 text-ink/72">
                Families can try preview worlds first, then unlock the full map when they are ready.
              </p>
            </div>
            <div className="rounded-[1.6rem] bg-white/82 px-5 py-5">
              <h3 className="text-xl font-black text-ink">Local development ready</h3>
              <p className="mt-3 text-base leading-7 text-ink/72">
                The sign-up flow creates a local parent account in your MySQL-backed setup so you can test a real path now.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing" className="rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white">
              See lifetime plan
            </Link>
            <Link
              href="/signin"
              className="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-extrabold text-ink"
            >
              Already have an account
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
