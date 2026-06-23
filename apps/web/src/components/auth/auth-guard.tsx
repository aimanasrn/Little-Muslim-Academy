"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAuth } from "./auth-provider";

export function AuthGuard({
  children,
  requireRole,
  requireLifetimeAccess = false,
  title,
  description
}: {
  children: ReactNode;
  requireRole?: "parent" | "admin";
  requireLifetimeAccess?: boolean;
  title: string;
  description: string;
}) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="rounded-[2rem] bg-white/80 p-6 shadow-cloud">
        <p className="text-lg font-bold text-ink">Checking your adventure pass...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-[2rem] bg-white/85 p-6 shadow-cloud">
        <h1 className="text-3xl font-black text-ink">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-ink/75">{description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/signin" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
            Sign In
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink"
          >
            View Lifetime Access
          </Link>
        </div>
      </div>
    );
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div className="rounded-[2rem] bg-white/85 p-6 shadow-cloud">
        <h1 className="text-3xl font-black text-ink">This area is for {requireRole} accounts only.</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-ink/75">
          You are signed in as {user.email}. Use an account with the correct role to continue.
        </p>
      </div>
    );
  }

  if (requireLifetimeAccess && !user.hasLifetimeAccess) {
    return (
      <div className="rounded-[2rem] bg-white/85 p-6 shadow-cloud">
        <h1 className="text-3xl font-black text-ink">Full world access is still locked.</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-ink/75">
          This route needs a paid lifetime pass. Preview worlds stay open, but this mission is premium.
        </p>
        <div className="mt-5">
          <Link href="/pricing" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
            Unlock Lifetime Access
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
