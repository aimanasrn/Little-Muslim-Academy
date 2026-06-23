import { HurufIslandGame } from "../../../../components/game/huruf-island-game";
import { SessionBanner } from "../../../../components/auth/session-banner";
import { SiteShell } from "../../../../components/layout/site-shell";

export default function HurufIslandPage() {
  return (
    <SiteShell>
      <SessionBanner />
      <HurufIslandGame />
    </SiteShell>
  );
}
