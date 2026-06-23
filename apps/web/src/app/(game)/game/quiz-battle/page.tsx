import Link from "next/link";
import { ProtectedView } from "../../../../components/auth/protected-view";
import { SessionBanner } from "../../../../components/auth/session-banner";
import { SiteShell } from "../../../../components/layout/site-shell";

const questions = [
  "Which letter did the teacher say?",
  "Which dua matches the bedtime picture?",
  "What lesson did the story teach?"
];

export default function QuizBattlePage() {
  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView requireLifetimeAccess>
      <main className="space-y-6">
        <section className="rounded-[2rem] bg-gradient-to-br from-peach/70 via-white to-sun/70 p-6 shadow-cloud md:p-8">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">
              Quiz Battle
            </p>
            <h1 className="text-4xl font-black text-ink md:text-5xl">
              Final challenge before the next path unlocks.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink/75">
              Answer simple multiple-choice questions, earn a star rating, and unlock the next
              world when you pass.
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          {questions.map((question, index) => (
            <article key={question} className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
                Question {index + 1}
              </p>
              <h2 className="mt-3 text-2xl font-black text-ink">{question}</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {["Choice A", "Choice B", "Choice C"].map((choice) => (
                  <button
                    key={choice}
                    className="rounded-[1.5rem] border border-ink/10 bg-cream px-4 py-4 text-left text-base font-bold text-ink"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>

        <Link href="/game/rewards" className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
          Submit Quiz
        </Link>
      </main>
      </ProtectedView>
    </SiteShell>
  );
}
