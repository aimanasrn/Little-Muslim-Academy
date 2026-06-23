import Link from "next/link";
import { SiteShell } from "../components/layout/site-shell";
import { HeroParticles } from "../components/marketing/hero-particles";
import { getWorldCards } from "../lib/worlds";

const stepCards = [
  {
    title: "Parent joins once",
    body: "Create an account, unlock lifetime access, and open the adventure map for your family."
  },
  {
    title: "Child picks a profile",
    body: "Choose a child profile, start from level one, and enter a cheerful learning world."
  },
  {
    title: "Play, listen, trace, repeat",
    body: "Mini games use sound, matching, tapping, and tracing instead of classroom-style modules."
  },
  {
    title: "Stars unlock new paths",
    body: "Each finished mission adds stars, coins, badges, and new routes across the game map."
  }
] as const;

const rewardCards = [
  "Level missions with clear goals",
  "Reward stars and coins after play",
  "Locked paths that open with progress",
  "Audio-first play for preschool learners"
] as const;

export default async function HomePage() {
  const worlds = await getWorldCards();
  const previewWorlds = worlds.filter((world) => world.previewEnabled);
  const worldMarkers = ["HI", "SF", "KC", "WG", "DV", "PZ"] as const;

  return (
    <SiteShell>
      <main className="space-y-8 pb-10 pt-6 md:space-y-10">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 px-5 py-5 shadow-cloud backdrop-blur md:px-8 md:py-7">
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="soft-float flex h-12 w-12 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-sun via-white to-peach text-xl font-black text-ink shadow-cloud">
                LM
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink/45">
                  Little Muslim
                </p>
                <p className="text-lg font-black text-ink">Learning Adventure</p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink/75">
              <a href="#worlds" className="rounded-full px-4 py-2 transition hover:bg-white/70">
                Worlds
              </a>
              <a href="#how-it-works" className="rounded-full px-4 py-2 transition hover:bg-white/70">
                How it works
              </a>
              <a href="#preview" className="rounded-full px-4 py-2 transition hover:bg-white/70">
                Demo
              </a>
              <Link href="/signin" className="rounded-full border border-ink/10 bg-white px-4 py-2 text-ink">
                Sign in
              </Link>
              <Link href="/signup" className="rounded-full bg-ink px-5 py-2 text-white shadow-sm">
                Start now
              </Link>
            </nav>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-gradient-to-br from-sky/80 via-cream to-peach/75 px-5 py-8 shadow-cloud md:px-8 md:py-10">
          <HeroParticles />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,227,139,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(189,236,200,0.24),transparent_22%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/62 via-white/34 to-transparent" />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-extrabold text-ink shadow-sm backdrop-blur">
                Preschool Islamic learning, reimagined as a game
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-black leading-[1.02] text-ink md:text-6xl">
                  A colorful Islamic adventure where children learn by playing through islands,
                  stories, stars, and rewards.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink/75">
                  Not a normal course dashboard. Children enter a map world, complete mini games,
                  unlock new paths, and grow confidence with letters, doa, stories, and simple
                  Islamic words.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="rounded-full bg-ink px-6 py-4 text-sm font-extrabold text-white transition active:translate-y-px"
                >
                  Start Lifetime Access
                </Link>
                <Link
                  href="/game/huruf-island"
                  className="rounded-full border border-ink/10 bg-white/82 px-6 py-4 text-sm font-extrabold text-ink transition active:translate-y-px"
                >
                  Try Demo World
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-full border border-transparent bg-sun/92 px-6 py-4 text-sm font-extrabold text-ink transition active:translate-y-px"
                >
                  See Pricing
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.6rem] bg-white/78 px-4 py-4 backdrop-blur">
                  <p className="text-sm font-bold text-ink/50">Adventure worlds</p>
                  <p className="mt-1 text-3xl font-black text-ink">6</p>
                </div>
                <div className="rounded-[1.6rem] bg-white/78 px-4 py-4 backdrop-blur">
                  <p className="text-sm font-bold text-ink/50">Preview worlds</p>
                  <p className="mt-1 text-3xl font-black text-ink">{previewWorlds.length}</p>
                </div>
                <div className="rounded-[1.6rem] bg-white/78 px-4 py-4 backdrop-blur">
                  <p className="text-sm font-bold text-ink/50">Play style</p>
                  <p className="mt-1 text-2xl font-black text-ink">Audio + touch</p>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/75 bg-white/78 p-5 shadow-cloud backdrop-blur">
                <div className="absolute right-4 top-4 rounded-full bg-sun px-4 py-2 text-sm font-extrabold text-ink">
                  3 stars won
                </div>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink/45">
                        World map
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-ink">Amina&apos;s adventure path</h2>
                    </div>
                    <div className="rounded-[1.3rem] bg-mint px-4 py-3 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">Coins</p>
                      <p className="mt-1 text-2xl font-black text-ink">240</p>
                    </div>
                  </div>

                  <div className="relative rounded-[1.9rem] bg-gradient-to-br from-white to-cream px-4 py-6">
                    <div className="pointer-events-none absolute left-12 top-10 right-12 h-3 rounded-full bg-white" />
                    <div className="pointer-events-none absolute left-14 right-20 top-[2.95rem] h-2 rounded-full bg-gradient-to-r from-sky via-sun to-mint" />
                    <div className="grid grid-cols-3 gap-3 md:grid-cols-2">
                      {worlds.slice(0, 6).map((world, index) => (
                        <div
                          key={world.slug}
                          className={`relative ${index % 2 === 1 ? "md:translate-y-12" : ""}`}
                        >
                          <div
                            className={`soft-float rounded-[1.7rem] border border-white/70 px-4 py-4 shadow-sm ${
                              world.unlocked
                                ? "bg-white"
                                : world.previewEnabled
                                  ? "bg-peach/70"
                                  : "bg-white/85"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/45">
                                  {world.shortLabel}
                                </p>
                                <p className="mt-1 text-base font-black text-ink">{world.name}</p>
                              </div>
                              <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-cream text-xs font-black text-ink shadow-sm">
                                {worldMarkers[index]}
                              </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm font-bold">
                              <span className="text-ink/60">Level {index + 1}</span>
                              <span className="rounded-full bg-cream px-3 py-1 text-ink">
                                {world.unlocked ? "Open" : world.previewEnabled ? "Preview" : "Locked"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {rewardCards.map((reward) => (
                      <div key={reward} className="rounded-[1.4rem] bg-cream px-4 py-4 text-sm font-bold text-ink/80">
                        {reward}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="worlds" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-cloud backdrop-blur">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/55">
              Explore the world
            </p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              Every area feels like a place children want to visit again.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/72">
              The map starts simple, then opens into islands, forests, castles, villages, and a
              picture zoo. Each world teaches a different skill through play, sound, and visual
              rewards.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/game/huruf-island" className="rounded-full bg-sun px-5 py-3 text-sm font-extrabold text-ink">
                Open Huruf Island
              </Link>
              <Link
                href="/game/picture-dictionary-zoo"
                className="rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-extrabold text-white"
              >
                Try Zoo Preview
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {worlds.map((world) => (
              <article
                key={world.slug}
                className="group rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-cloud backdrop-blur transition hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/45">
                      {world.shortLabel}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-white">{world.name}</h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-2 text-xs font-extrabold ${
                      world.unlocked
                        ? "bg-mint text-ink"
                        : world.previewEnabled
                          ? "bg-sun text-ink"
                          : "bg-cream text-ink/65"
                    }`}
                  >
                    {world.unlocked ? "Open" : world.previewEnabled ? "Preview" : "Locked"}
                  </span>
                </div>
                <p className="mt-3 text-base leading-7 text-white/72">{world.description}</p>
                <div className="mt-5 rounded-[1.5rem] bg-white/8 px-4 py-4">
                  <p className="text-sm font-bold text-white/55">Mini game focus</p>
                  <p className="mt-2 text-base font-black text-white">{world.mission}</p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-white/55">{world.reward}</span>
                  <Link
                    href={world.unlocked || world.previewEnabled ? `/game/${world.slug}` : "/pricing"}
                    className="rounded-full bg-sun px-4 py-3 text-sm font-extrabold text-ink transition active:translate-y-px"
                  >
                    {world.unlocked || world.previewEnabled ? "Enter world" : "Unlock access"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-cloud backdrop-blur">
            <h2 className="text-3xl font-black text-white md:text-5xl">
              A child-friendly flow for parents and preschoolers.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {stepCards.map((step, index) => (
                <div key={step.title} className="rounded-[1.7rem] bg-white/8 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sun text-lg font-black text-ink shadow-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-black text-white">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-white/72">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(189,236,200,0.1),rgba(168,221,255,0.08))] p-6 shadow-cloud backdrop-blur">
            <div className="rounded-[1.8rem] bg-white/8 p-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/48">
                Parent actions
              </p>
              <div className="mt-5 space-y-3">
                <Link href="/signup" className="block rounded-[1.4rem] bg-sun px-5 py-4 text-center text-sm font-extrabold text-ink">
                  Create parent account
                </Link>
                <Link
                  href="/checkout"
                  className="block rounded-[1.4rem] bg-sky px-5 py-4 text-center text-sm font-extrabold text-ink"
                >
                  Go to checkout
                </Link>
                <Link
                  href="/dashboard"
                  className="block rounded-[1.4rem] border border-white/15 bg-white/8 px-5 py-4 text-center text-sm font-extrabold text-white"
                >
                  Open parent dashboard
                </Link>
                <Link
                  href="/signin"
                  className="block rounded-[1.4rem] border border-white/15 bg-white/8 px-5 py-4 text-center text-sm font-extrabold text-white"
                >
                  Sign in with demo account
                </Link>
              </div>

              <div className="mt-6 rounded-[1.6rem] bg-white/8 px-4 py-4">
                <p className="text-sm font-bold text-white/55">Demo login</p>
                <p className="mt-2 text-base font-black text-white">parent@example.com</p>
                <p className="text-base font-bold text-white/75">password123</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="preview"
          className="grid gap-6 overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-ink to-[#23486f] px-5 py-7 shadow-cloud md:grid-cols-[0.95fr_1.05fr] md:px-8 md:py-8"
        >
          <div className="space-y-4 text-white">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/70">
              Preview before purchase
            </p>
            <h2 className="max-w-2xl text-3xl font-black leading-tight md:text-5xl">
              Let families test the adventure first, then unlock the full path for life.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-white/78">
              Guests can preview selected worlds. Paid parents get the full game map, protected
              routes, saved progress, and child rewards stored in the local database.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {previewWorlds.map((world) => (
              <div key={world.slug} className="rounded-[1.8rem] bg-white/10 p-5 text-white backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/65">
                  Preview world
                </p>
                <h3 className="mt-2 text-2xl font-black">{world.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/76">{world.theme}</p>
                <Link
                  href={`/game/${world.slug}`}
                  className="mt-5 inline-flex rounded-full bg-white px-4 py-3 text-sm font-extrabold text-ink"
                >
                  Play preview
                </Link>
              </div>
            ))}
            <div className="rounded-[1.8rem] bg-sun/92 p-5 text-ink">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/55">
                Unlock full version
              </p>
              <h3 className="mt-2 text-2xl font-black">One payment, full adventure</h3>
              <p className="mt-3 text-sm leading-7 text-ink/72">
                Upgrade once to open the full map, future levels, reward flow, and parent tools.
              </p>
              <Link
                href="/pricing"
                className="mt-5 inline-flex rounded-full bg-ink px-4 py-3 text-sm font-extrabold text-white"
              >
                View access plan
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
