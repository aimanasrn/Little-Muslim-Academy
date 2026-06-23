import { PlayPanel } from "../../../../components/game/play-panel";
import { SessionBanner } from "../../../../components/auth/session-banner";
import { SiteShell } from "../../../../components/layout/site-shell";
import { worlds } from "../../../../data/game-content";

export default function PictureDictionaryZooPage() {
  return (
    <SiteShell>
      <SessionBanner />
      <PlayPanel world={worlds[5]!} />
    </SiteShell>
  );
}
