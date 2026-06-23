import type { ReactNode } from "react";
import { ProtectedView } from "../../components/auth/protected-view";
import { SessionBanner } from "../../components/auth/session-banner";
import { SiteShell } from "../../components/layout/site-shell";

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView>{children}</ProtectedView>
    </SiteShell>
  );
}
