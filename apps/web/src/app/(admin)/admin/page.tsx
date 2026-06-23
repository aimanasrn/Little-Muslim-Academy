import { AdminShell, ListCard, Panel, StatCard } from "./_components/admin-shell";
import {
  operationsBoard,
  overviewMetrics,
  recentActivity,
  teamQueues
} from "./_data/admin-data";

export default function AdminOverviewPage() {
  return (
    <AdminShell
      eyebrow="Adventure Admin"
      title="Keep the learning world joyful while the operations work stays tidy."
      description="This staff view tracks families, child profiles, world health, payments, and progress in one playful control room that still matches the Little Muslim Learning Adventure brand."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel eyebrow="Operations board" title="The main areas staff checks each day.">
          <div className="grid gap-4 md:grid-cols-2">
            {operationsBoard.map((item) => (
              <article key={item.title} className="rounded-4xl bg-cream p-5">
                <h3 className="text-2xl font-black text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/75">{item.summary}</p>
                <div className="mt-4 grid gap-3">
                  {item.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between rounded-3xl bg-white/85 px-4 py-3"
                    >
                      <span className="text-sm font-bold text-ink/60">{stat.label}</span>
                      <span className="text-sm font-black text-ink">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Right now" title="Today&apos;s movement across the map.">
          <div className="grid gap-4">
            {recentActivity.map((item) => (
              <article key={`${item.time}-${item.title}`} className="rounded-4xl bg-sky/30 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-black text-ink">{item.title}</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink/60">
                    {item.time}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/75">{item.detail}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {teamQueues.map((queue) => (
          <ListCard key={queue.title} title={queue.title} items={queue.items} tone={queue.tone} />
        ))}
      </div>
    </AdminShell>
  );
}
