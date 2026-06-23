"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInParent } from "../../lib/api";
import { useAuth } from "../auth/auth-provider";

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("parent@example.com");
  const [password, setPassword] = useState("password123");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setStatus(null);

    try {
      const session = await signInParent({ email, password });
      signIn(session.token, session.user);
      setStatus(`Signed in as ${session.user.email}`);
      router.push(session.user.role === "admin" ? "/admin" : "/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  }

  function useDemoAccount(role: "parent" | "admin") {
    if (role === "admin") {
      setEmail("admin@example.com");
      setPassword("password123");
      return;
    }

    setEmail("parent@example.com");
    setPassword("password123");
  }

  return (
    <form className="grid gap-4 md:max-w-xl" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label className="text-sm font-extrabold text-ink" htmlFor="signin-email">
          Parent or admin email
        </label>
        <input
          id="signin-email"
          className="rounded-[1.4rem] border border-ink/10 bg-white px-4 py-4 outline-none transition focus:border-ink/20 focus:ring-4 focus:ring-sky/30"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-extrabold text-ink" htmlFor="signin-password">
          Password
        </label>
        <input
          id="signin-password"
          className="rounded-[1.4rem] border border-ink/10 bg-white px-4 py-4 outline-none transition focus:border-ink/20 focus:ring-4 focus:ring-sky/30"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-ink"
          type="button"
          onClick={() => useDemoAccount("parent")}
        >
          Use parent demo
        </button>
        <button
          className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-ink"
          type="button"
          onClick={() => useDemoAccount("admin")}
        >
          Use admin demo
        </button>
      </div>
      <button
        className="rounded-full bg-ink px-5 py-4 text-sm font-extrabold text-white disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
      <p className="rounded-[1.4rem] bg-cream px-4 py-4 text-sm font-semibold leading-7 text-ink/70">
        Demo accounts: <strong>parent@example.com</strong> or <strong>admin@example.com</strong> with <strong>password123</strong>
      </p>
      {status ? (
        <p className="rounded-[1.4rem] bg-mint px-4 py-4 text-sm font-bold text-ink">{status}</p>
      ) : null}
      {error ? (
        <p className="rounded-[1.4rem] bg-peach px-4 py-4 text-sm font-bold text-ink">{error}</p>
      ) : null}
      <p className="text-sm font-bold text-ink/65">
        Need a parent account?{" "}
        <Link href="/signup" className="text-ink underline decoration-2 underline-offset-4">
          Create one here
        </Link>
      </p>
    </form>
  );
}
