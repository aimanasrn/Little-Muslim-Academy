import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-4xl bg-white/80 p-6 shadow-cloud backdrop-blur md:p-8">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-ink/55">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-black text-ink md:text-4xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
