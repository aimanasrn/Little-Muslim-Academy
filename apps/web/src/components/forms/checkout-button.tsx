"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "../../lib/api";
import { useAuth } from "../auth/auth-provider";

export function CheckoutButton({ userId = "user_parent_demo" }: { userId?: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCheckout() {
    const checkoutUserId = user?.id ?? userId;

    if (!checkoutUserId || checkoutUserId === "user_parent_demo") {
      router.push("/signin");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const session = await createCheckoutSession(checkoutUserId);
      window.location.href = session.checkoutUrl;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error ? checkoutError.message : "Unable to create checkout session"
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
        type="button"
        disabled={isSubmitting}
        onClick={handleCheckout}
      >
        {isSubmitting ? "Opening Checkout..." : user ? "Continue to Checkout" : "Sign In to Continue"}
      </button>
      {error ? (
        <p className="rounded-3xl bg-peach px-4 py-3 text-sm font-bold text-ink">{error}</p>
      ) : null}
    </div>
  );
}
