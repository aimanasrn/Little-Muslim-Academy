import { getPrisma } from "../../lib/prisma.js";

export async function createCheckout(userId: string) {
  try {
    const payment = await getPrisma().payment.create({
      data: {
        userId,
        provider: "manual",
        status: "pending",
        amountCents: 14900
      }
    });

    return {
      userId,
      status: payment.status,
      checkoutUrl: "http://localhost:3000/payment/success?mockPayment=1"
    };
  } catch {
    return {
      userId,
      status: "pending",
      checkoutUrl: "http://localhost:3000/payment/success?mockPayment=1"
    };
  }
}
