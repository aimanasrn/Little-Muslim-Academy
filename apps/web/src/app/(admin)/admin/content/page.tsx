import { AdminShell, ListCard, Panel } from "../_components/admin-shell";
import {
  contentChecks,
  contentPillars,
  editorialPipeline
} from "../_data/admin-data";

export default function AdminContentPage() {
  return (
    <AdminShell
      eyebrow="Content Studio"
      title="Organize every question, story, doa, and dictionary card like a gentle classroom backstage."
      description="This view helps staff manage learning materials from first draft through Arabic review, narration, and publish-ready batches without losing the warm game tone families expect."
    >
      <Panel eyebrow="Library overview" title="The content collection that powers the adventure.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contentPillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`rounded-4xl p-5 ${
                index === 0
                  ? "bg-sky/45"
                  : index === 1
                    ? "bg-mint/60"
                    : index === 2
                      ? "bg-peach/60"
                      : "bg-sun/65"
              }`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
                {pillar.title}
              </p>
              <p className="mt-3 text-3xl font-black text-ink">{pillar.count}</p>
              <p className="mt-3 text-sm leading-6 text-ink/75">{pillar.summary}</p>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel eyebrow="Editorial pipeline" title="Move content from draft to publish-ready.">
          <div className="grid gap-4">
            {editorialPipeline.map((stage) => (
              <article key={stage.stage} className="rounded-4xl bg-cream p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-black text-ink">{stage.stage}</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink/55">
                    {stage.items.length} groups
                  </span>
                </div>
                <div className="mt-4 grid gap-3">
                  {stage.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl bg-white/85 px-4 py-3 text-sm leading-6 text-ink/75"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Content health" title="Checks that protect clarity and trust.">
          <div className="grid gap-4">
            {[
              {
                title: "Questions",
                detail: "Keep prompts short, visual, and easy to answer on first listen."
              },
              {
                title: "Stories",
                detail: "Use scenes small enough for preschool attention spans and reward empathy."
              },
              {
                title: "Doa",
                detail: "Group by real moments in a child&apos;s day so parents can reinforce them naturally."
              },
              {
                title: "Dictionary",
                detail: "Make tags and imagery consistent so search, browse, and recall all feel simple."
              }
            ].map((item) => (
              <article key={item.title} className="rounded-4xl bg-white p-5">
                <h3 className="text-xl font-black text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/75">{item.detail}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {contentChecks.map((check, index) => (
          <ListCard
            key={check.title}
            title={check.title}
            items={check.items}
            tone={index === 0 ? "bg-mint/55" : "bg-peach/55"}
          />
        ))}
      </div>
    </AdminShell>
  );
}
