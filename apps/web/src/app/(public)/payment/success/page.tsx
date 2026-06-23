import { Section } from "../../../../components/layout/section";
import { SiteShell } from "../../../../components/layout/site-shell";

export default function PaymentSuccessPage() {
  return (
    <SiteShell>
      <Section eyebrow="Payment Success" title="Lifetime access is now active.">
        <p className="text-lg leading-8 text-ink/75">
          Your parent account can now create child profiles and unlock the full learning
          adventure.
        </p>
      </Section>
    </SiteShell>
  );
}
