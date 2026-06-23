import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">{children}</div>;
}
