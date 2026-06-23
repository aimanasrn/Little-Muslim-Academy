"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpParent } from "../../lib/api";
import { useAuth } from "../auth/auth-provider";

export function SignUpForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setError(null);

    try {
      const session = await signUpParent({ email, password });
      signIn(session.token, session.user);
      setStatus("Parent account created. Let’s unlock your child adventure.");
      router.push("/pricing");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to create account");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label className="text-sm font-extrabold text-ink" htmlFor="signup-email">
          Parent email
        </label>
        <input
          id="signup-email"
          className="rounded-[1.4rem] border border-ink/10 bg-white px-4 py-4 text-ink outline-none transition focus:border-ink/20 focus:ring-4 focus:ring-sky/30"
          placeholder="parent@email.com"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-extrabold text-ink" htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          className="rounded-[1.4rem] border border-ink/10 bg-white px-4 py-4 text-ink outline-none transition focus:border-ink/20 focus:ring-4 focus:ring-sky/30"
          placeholder="At least 8 characters"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button
        className="w-full rounded-full bg-ink px-6 py-4 text-sm font-extrabold text-white transition active:translate-y-px disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create parent account"}
      </button>

      <p className="rounded-[1.4rem] bg-cream px-4 py-4 text-sm font-bold leading-7 text-ink/75">
        After sign up, you will continue to pricing to unlock lifetime access for the full game map.
      </p>

      {status ? (
        <p className="rounded-[1.4rem] bg-mint px-4 py-4 text-sm font-bold text-ink">{status}</p>
      ) : null}

      {error ? (
        <p className="rounded-[1.4rem] bg-peach px-4 py-4 text-sm font-bold text-ink">{error}</p>
      ) : null}

      <p className="text-sm font-bold text-ink/65">
        Already have an account?{" "}
        <Link href="/signin" className="text-ink underline decoration-2 underline-offset-4">
          Sign in here
        </Link>
      </p>
    </form>
  );
}
