import type { WorldKey } from "@little-muslim/shared";
import { fetchGameWorldStates } from "./api";
import { worlds, type WorldSummary } from "../data/game-content";

export type GameWorldCard = WorldSummary & {
  unlocked: boolean;
  previewEnabled: boolean;
};

const worldSummaryMap = new Map<WorldKey, WorldSummary>(
  worlds.map((world) => [world.slug as WorldKey, world])
);

export async function getWorldCards(): Promise<GameWorldCard[]> {
  try {
    const response = await fetchGameWorldStates();

    return response.worlds
      .map((worldState) => {
        const world = worldSummaryMap.get(worldState.key);

        if (!world) {
          return null;
        }

        return {
          ...world,
          unlocked: worldState.unlocked,
          previewEnabled: worldState.previewEnabled
        };
      })
      .filter((world): world is GameWorldCard => world !== null);
  } catch {
    return worlds.map((world, index) => ({
      ...world,
      unlocked: index < 3,
      previewEnabled: index < 2
    }));
  }
}

export function getWorldBySlug(slug: string) {
  return worlds.find((world) => world.slug === slug) ?? null;
}
