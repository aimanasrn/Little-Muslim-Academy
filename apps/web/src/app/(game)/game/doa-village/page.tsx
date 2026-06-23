import { PlayPanel } from "../../../../components/game/play-panel";
import { ProtectedView } from "../../../../components/auth/protected-view";
import { SessionBanner } from "../../../../components/auth/session-banner";
import { SiteShell } from "../../../../components/layout/site-shell";
import { worlds } from "../../../../data/game-content";

export default function DoaVillagePage() {
  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView requireLifetimeAccess>
        <PlayPanel world={worlds[4]!} />
      </ProtectedView>
    </SiteShell>
  );
}
