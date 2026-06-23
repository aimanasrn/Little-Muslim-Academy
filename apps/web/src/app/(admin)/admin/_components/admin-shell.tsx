import Link from "next/link";
import type { ReactNode } from "react";
import { SiteShell } from "../../../../components/layout/site-shell";
import { adminNav } from "../_data/admin-data";

export function AdminShell({
  title,
  eyebrow,
  description,
  children
}: {
  title: string;
  eyebrow: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <main className="space-y-6 py-2">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/90 via-sky/30 to-peach/45 p-6 shadow-cloud md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
                {eyebrow}
              </p>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-black leading-tight text-ink md:text-5xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-ink/75 md:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white/85 p-4 shadow-cloud">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
                Staff map
              </p>
              <div className="mt-3 grid gap-3">
                {adminNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-3xl border border-ink/10 bg-cream px-4 py-3 transition hover:-translate-y-0.5 hover:border-ink/20"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-lg font-black text-ink">{item.label}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink/60">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {children}
      </main>
    </SiteShell>
  );
}

export function Panel({
  title,
  eyebrow,
  children,
  className = ""
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-4xl bg-white/85 p-6 shadow-cloud backdrop-blur md:p-8 ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-ink/55">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-black text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  note,
  tone
}: {
  label: string;
  value: string;
  note: string;
  tone: string;
}) {
  return (
    <article className={`rounded-4xl ${tone} p-5`}>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/55">{label}</p>
      <p className="mt-3 text-3xl font-black text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">{note}</p>
    </article>
  );
}

export function ListCard({
  title,
  items,
  tone = "bg-white"
}: {
  title: string;
  items: readonly string[];
  tone?: string;
}) {
  return (
    <article className={`rounded-4xl ${tone} p-5`}>
      <h3 className="text-xl font-black text-ink">{title}</h3>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-3xl bg-white/80 px-4 py-3 text-sm leading-6 text-ink/75">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
