import { WORLD_KEYS, type WorldKey } from "@little-muslim/shared";
import { getPrisma } from "../../lib/prisma.js";

type GameWorldState = {
  key: WorldKey;
  unlocked: boolean;
  previewEnabled: boolean;
};

const fallbackWorldStates: GameWorldState[] = [
  { key: "huruf-island", unlocked: true, previewEnabled: true },
  { key: "story-forest", unlocked: false, previewEnabled: false },
  { key: "kalimah-castle", unlocked: false, previewEnabled: false },
  { key: "writing-garden", unlocked: false, previewEnabled: false },
  { key: "doa-village", unlocked: false, previewEnabled: false },
  { key: "picture-dictionary-zoo", unlocked: true, previewEnabled: true }
];

const worldKeyOrder = new Map(WORLD_KEYS.map((key, index) => [key, index]));

export async function listWorlds() {
  try {
    const records = await getPrisma().gameWorld.findMany();

    if (records.length === 0) {
      return fallbackWorldStates;
    }

    return records
      .filter((record): record is typeof record & { key: WorldKey } =>
        WORLD_KEYS.includes(record.key as WorldKey)
      )
      .sort((left, right) => {
        const leftIndex = worldKeyOrder.get(left.key) ?? Number.MAX_SAFE_INTEGER;
        const rightIndex = worldKeyOrder.get(right.key) ?? Number.MAX_SAFE_INTEGER;

        return leftIndex - rightIndex;
      })
      .map((record) => ({
        key: record.key,
        previewEnabled: record.previewEnabled,
        unlocked: record.previewEnabled
      }));
  } catch {
    return fallbackWorldStates;
  }
}
