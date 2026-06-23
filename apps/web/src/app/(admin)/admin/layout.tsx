import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProtectedView } from "../../../components/auth/protected-view";
import { SessionBanner } from "../../../components/auth/session-banner";
import { SiteShell } from "../../../components/layout/site-shell";

export const metadata: Metadata = {
  title: "Admin | Little Muslim Learning Adventure",
  description: "Staff dashboard for managing worlds, content, families, and progress."
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView requireRole="admin">{children}</ProtectedView>
    </SiteShell>
  );
}
