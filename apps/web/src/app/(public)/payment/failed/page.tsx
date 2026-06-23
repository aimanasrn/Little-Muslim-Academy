import { Section } from "../../../../components/layout/section";
import { SiteShell } from "../../../../components/layout/site-shell";

export default function PaymentFailedPage() {
  return (
    <SiteShell>
      <Section eyebrow="Payment Failed" title="We couldn't complete that payment.">
        <p className="text-lg leading-8 text-ink/75">
          The app will later use this page to guide parents back into a retryable gateway flow
          without losing their account progress.
        </p>
      </Section>
    </SiteShell>
  );
}
