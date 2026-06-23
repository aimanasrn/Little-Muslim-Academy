import { WritingGardenGame } from "../../../../components/game/writing-garden";
import { ProtectedView } from "../../../../components/auth/protected-view";
import { SessionBanner } from "../../../../components/auth/session-banner";
import { SiteShell } from "../../../../components/layout/site-shell";

export default function WritingGardenPage() {
  return (
    <SiteShell>
      <SessionBanner />
      <ProtectedView requireLifetimeAccess>
        <WritingGardenGame />
      </ProtectedView>
    </SiteShell>
  );
}
