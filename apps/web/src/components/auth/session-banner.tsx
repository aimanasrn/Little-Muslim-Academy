"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";

export function SessionBanner() {
  const { isLoading, user, signOut } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[1.75rem] bg-white/80 px-5 py-4 shadow-cloud">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink/55">Adventure Access</p>
        <p className="mt-1 text-base font-bold text-ink">
          {user
            ? `${user.email} · ${user.hasLifetimeAccess ? "Lifetime access active" : "Preview only"}`
            : "Guest preview mode"}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {user ? (
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-bold text-ink"
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link href="/signin" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">
              Sign In
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-bold text-ink"
            >
              Unlock Full Game
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
