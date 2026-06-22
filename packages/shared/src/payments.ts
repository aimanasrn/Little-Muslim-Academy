import { z } from "zod";

export const paymentStatusSchema = z.enum([
  "initiated",
  "pending",
  "paid",
  "failed",
  "expired",
  "refunded"
]);

export const checkoutRequestSchema = z.object({
  userId: z.string().uuid(),
  amountCents: z.number().int().positive(),
  currency: z.string().default("MYR")
});

export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type CheckoutRequest = z.input<typeof checkoutRequestSchema>;
