export function createCheckout(userId: string) {
  return {
    userId,
    status: "pending",
    checkoutUrl: "http://localhost:3000/payment/success?mockPayment=1"
  };
}
