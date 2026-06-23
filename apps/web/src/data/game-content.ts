export type WorldSummary = {
  slug: string;
  name: string;
  shortLabel: string;
  theme: string;
  accent: string;
  icon: string;
  description: string;
  mission: string;
  reward: string;
  miniGames: string[];
};

export const worlds: WorldSummary[] = [
  {
    slug: "huruf-island",
    name: "Huruf Island",
    shortLabel: "Letters",
    theme: "Arabic letters with music, matching, and tapping games.",
    accent: "bg-sky",
    icon: "Alif",
    description: "Children learn Alif, Ba, and Ta through friendly island mini games.",
    mission: "Find the glowing letter that matches the teacher voice.",
    reward: "Pearl Star Badge",
    miniGames: [
      "Tap the correct Arabic letter",
      "Listen and choose the correct letter",
      "Match letter with example word",
      "Drag and drop letter matching"
    ]
  },
  {
    slug: "story-forest",
    name: "Story Forest",
    shortLabel: "Stories",
    theme: "Moral stories, soft narration, and simple choices.",
    accent: "bg-mint",
    icon: "Book",
    description: "A calm forest where every story teaches kindness, prayer, and good habits.",
    mission: "Listen carefully, then choose the lesson from the story.",
    reward: "Story Lantern Badge",
    miniGames: [
      "Read while audio plays",
      "Tap correct answer after story",
      "Choose moral value from story",
      "Unlock next story after completion"
    ]
  },
  {
    slug: "kalimah-castle",
    name: "Kalimah Castle",
    shortLabel: "Words",
    theme: "Simple Islamic words, gems, and castle gates.",
    accent: "bg-peach",
    icon: "Gem",
    description: "Children discover basic Islamic words and build confidence with meaning games.",
    mission: "Collect castle gems by pairing each word with the correct meaning.",
    reward: "Castle Gem Badge",
    miniGames: [
      "Match Islamic word with image",
      "Listen and choose correct word",
      "Simple meaning quiz",
      "Collect castle gems after correct answers"
    ]
  },
  {
    slug: "writing-garden",
    name: "Writing Garden",
    shortLabel: "Tracing",
    theme: "Tracing paths, flowers, and gentle writing practice.",
    accent: "bg-sun",
    icon: "Pen",
    description: "A flower-filled garden for tracing and writing Arabic letters step by step.",
    mission: "Trace each letter carefully to grow the garden path.",
    reward: "Flower Writer Badge",
    miniGames: [
      "Trace Alif, Ba, Ta",
      "Canvas drawing area",
      "Reset button",
      "Complete tracing to earn flower badge"
    ]
  },
  {
    slug: "doa-village",
    name: "Doa Village",
    shortLabel: "Doa",
    theme: "Daily duas, scenes from daily life, and memory games.",
    accent: "bg-sky",
    icon: "Moon",
    description: "Children hear and match daily doa to everyday preschool situations.",
    mission: "Pick the right doa when the child enters a new daily moment.",
    reward: "Doa Moon Badge",
    miniGames: [
      "Listen to doa",
      "Choose correct doa for situation",
      "Match doa with image",
      "Memorization practice"
    ]
  },
  {
    slug: "picture-dictionary-zoo",
    name: "Picture Dictionary Zoo",
    shortLabel: "Zoo",
    theme: "Cute animals, picture cards, categories, and audio taps.",
    accent: "bg-mint",
    icon: "Zoo",
    description: "A bright zoo where children grow vocabulary with images, sounds, and matching.",
    mission: "Tap the picture that matches the word you hear.",
    reward: "Zoo Explorer Badge",
    miniGames: [
      "Image-word matching",
      "Listen and tap correct picture",
      "Category-based games",
      "Audio picture cards"
    ]
  }
];

export const childProfile = {
  name: "Amina",
  age: 5,
  stars: 48,
  badges: 7,
  coins: 240,
  level: 4,
  currentWorld: "Story Forest",
  nextMission: "Answer 3 story questions correctly"
};

export const badgeCollection = [
  "Pearl Star Badge",
  "Story Lantern Badge",
  "Castle Gem Badge",
  "Flower Writer Badge",
  "Doa Moon Badge",
  "Zoo Explorer Badge"
];

export const parentSnapshot = {
  paymentStatus: "Lifetime access active",
  completedLevels: 12,
  unlockedWorlds: 3
};
