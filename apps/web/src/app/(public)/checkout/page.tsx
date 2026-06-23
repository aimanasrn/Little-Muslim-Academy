import Link from "next/link";
import { CheckoutButton } from "../../../components/forms/checkout-button";
import { SiteShell } from "../../../components/layout/site-shell";

export default function CheckoutPage() {
  return (
    <SiteShell>
      <main className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="rounded-[2.2rem] bg-white/84 p-6 shadow-cloud md:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/50">
            Checkout
          </p>
          <h1 className="mt-3 text-4xl font-black leading-[1.04] text-ink md:text-5xl">
            Continue into the lifetime access payment flow.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/72">
            This project currently uses a local placeholder gateway response. It is already wired through the Express API so the checkout button can evolve into ToyyibPay, Billplz, Stripe, or another provider next.
          </p>

          <div className="mt-8 rounded-[1.9rem] bg-gradient-to-br from-sky/70 via-white to-mint/70 p-5">
            <div className="rounded-[1.6rem] bg-white/88 p-5">
              <p className="text-sm font-bold text-ink/55">Current development behavior</p>
              <ul className="mt-4 grid gap-3 text-sm font-bold text-ink/78">
                <li className="rounded-[1.2rem] bg-cream px-4 py-4">Uses your signed-in parent account id</li>
                <li className="rounded-[1.2rem] bg-cream px-4 py-4">Creates a pending payment record when available</li>
                <li className="rounded-[1.2rem] bg-cream px-4 py-4">Redirects to local payment success placeholder</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-[2.2rem] bg-gradient-to-br from-ink to-[#23486f] p-6 text-white shadow-cloud md:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/70">
            Payment card
          </p>
          <div className="mt-4 rounded-[1.9rem] bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-bold text-white/70">Plan</p>
            <p className="mt-2 text-4xl font-black">Lifetime Access</p>
            <p className="mt-2 text-lg font-bold text-white/78">RM 149 one time</p>
            <p className="mt-4 text-sm leading-7 text-white/76">
              Sign in first if you have not already. The checkout button will use the local signed-in parent account instead of a hardcoded demo id.
            </p>
            <div className="mt-6">
              <CheckoutButton />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/signin" className="rounded-full bg-white px-5 py-3 text-sm font-extrabold text-ink">
              Sign in first
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-extrabold text-white"
            >
              Back to pricing
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
