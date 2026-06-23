"use client";

import type { ReactNode } from "react";
import { AuthGuard } from "./auth-guard";

export function ProtectedView({
  children,
  requireRole,
  requireLifetimeAccess = false
}: {
  children: ReactNode;
  requireRole?: "parent" | "admin";
  requireLifetimeAccess?: boolean;
}) {
  return (
    <AuthGuard
      requireRole={requireRole}
      requireLifetimeAccess={requireLifetimeAccess}
      title="Sign in to continue this adventure"
      description="This area saves child progress, rewards, and protected game data, so it needs a valid parent or admin session."
    >
      {children}
    </AuthGuard>
  );
}
