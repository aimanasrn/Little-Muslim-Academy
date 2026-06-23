import { AdminShell, Panel, StatCard } from "../_components/admin-shell";
import { worldStats, worlds } from "../_data/admin-data";

export default function AdminWorldsPage() {
  return (
    <AdminShell
      eyebrow="World Builder"
      title="Shape each island, forest, castle, and village before children ever tap play."
      description="Use this page to track world readiness, level-by-level focus, and the mix of rewards, questions, and audio polish needed to keep the map feeling magical."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {worldStats.map((metric, index) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            note={index === 0 ? "Two worlds already support live play" : index === 1 ? "Three levels per world in the current sprint" : index === 2 ? "Every level should land with clear learning checks" : "Badges, stars, and treasure beats tracked here"}
            tone={index % 2 === 0 ? "bg-sky/45" : "bg-mint/55"}
          />
        ))}
      </section>

      <Panel eyebrow="World catalog" title="Every game world at a glance.">
        <div className="grid gap-5 xl:grid-cols-2">
          {worlds.map((world) => (
            <article key={world.name} className="overflow-hidden rounded-4xl bg-cream">
              <div className={`p-5 ${world.accent}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-ink">{world.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-ink/70">{world.theme}</p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                    {world.status}
                  </span>
                </div>
              </div>
              <div className="grid gap-3 p-5">
                {world.levels.map((level) => (
                  <div key={level.name} className="rounded-3xl bg-white/85 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="text-lg font-black text-ink">{level.name}</h4>
                      <span className="text-sm font-bold text-ink/55">{level.state}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink/75">{level.focus}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel eyebrow="Level design notes" title="What a healthy level needs before release.">
          <div className="grid gap-3">
            {[
              "A simple objective a preschooler can understand from audio alone.",
              "One reward beat every few interactions so progress still feels like play.",
              "A short end-of-level recap that helps parents see the learning objective.",
              "Question difficulty that ramps gently instead of testing too early."
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-peach/45 px-4 py-3 text-sm leading-6 text-ink/75">
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Staff priorities" title="What the team is watching this sprint.">
          <div className="grid gap-3">
            {[
              "Reduce drop-off in Story Forest scene transitions.",
              "Finish reward art pack for Doa Village before voice recording.",
              "Lock the first Kalimah Castle script so QA can start dry runs.",
              "Review whether Huruf Island tracing prompts need slower pacing on tablets."
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-sun/55 px-4 py-3 text-sm leading-6 text-ink/75">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}
