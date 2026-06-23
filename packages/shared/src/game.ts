export const WORLD_KEYS = [
  "huruf-island",
  "story-forest",
  "kalimah-castle",
  "writing-garden",
  "doa-village",
  "picture-dictionary-zoo"
] as const;

export type WorldKey = (typeof WORLD_KEYS)[number];
