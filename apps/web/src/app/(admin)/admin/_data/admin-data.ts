export const adminNav = [
  { href: "/admin", label: "Overview", description: "Morning pulse" },
  { href: "/admin/worlds", label: "Worlds", description: "Maps and levels" },
  { href: "/admin/content", label: "Content", description: "Lessons and library" }
] as const;

export const overviewMetrics = [
  {
    label: "Active families",
    value: "184",
    note: "12 joined this week",
    tone: "bg-sky/55"
  },
  {
    label: "Child profiles",
    value: "267",
    note: "Average age band: 4 to 6",
    tone: "bg-mint/70"
  },
  {
    label: "Lifetime payments",
    value: "RM 42.4k",
    note: "97 percent checkout success",
    tone: "bg-peach/70"
  },
  {
    label: "Learning streaks",
    value: "71%",
    note: "Children finished at least one level this week",
    tone: "bg-sun/80"
  }
] as const;

export const operationsBoard = [
  {
    title: "Users",
    summary: "Moderate new families, resend welcome notes, and review sign-in friction before Friday.",
    stats: [
      { label: "Pending support", value: "8 tickets" },
      { label: "Waitlist invites", value: "22 slots" }
    ]
  },
  {
    title: "Child profiles",
    summary: "Spot duplicate siblings, confirm birth-year tags, and keep avatar choices age-appropriate.",
    stats: [
      { label: "Needs cleanup", value: "5 profiles" },
      { label: "Missing nickname", value: "14 profiles" }
    ]
  },
  {
    title: "Payments",
    summary: "Monitor failed checkouts, keep receipts tidy, and prep the next family promo bundle.",
    stats: [
      { label: "Failed today", value: "3" },
      { label: "Refund review", value: "1 case" }
    ]
  },
  {
    title: "Progress",
    summary: "Watch where children pause in the map so story pacing and reward timing stay joyful.",
    stats: [
      { label: "Drop-off level", value: "Story Forest 2" },
      { label: "Top reward", value: "Moon badge" }
    ]
  }
] as const;

export const teamQueues = [
  {
    title: "World release queue",
    tone: "bg-white/80",
    items: [
      "Huruf Island voice-over retake for level 4",
      "Doa Village treasure chest reward art pending",
      "Kalimah Castle finish banner needs Arabic proofing"
    ]
  },
  {
    title: "Content moderation queue",
    tone: "bg-cream",
    items: [
      "Flag two parent-submitted names with unusual symbols",
      "Check one story card for duplicate narration text",
      "Review three dictionary items missing image alt copy"
    ]
  }
] as const;

export const recentActivity = [
  {
    time: "08:15",
    title: "New family unlocked lifetime access",
    detail: "Checkout completed for the Rahman family bundle."
  },
  {
    time: "09:40",
    title: "Story Forest level pacing dipped",
    detail: "Completion rate fell after the second dialogue scene."
  },
  {
    time: "11:05",
    title: "Dictionary review batch approved",
    detail: "Six animal cards moved from draft to ready."
  },
  {
    time: "13:20",
    title: "Support request escalated",
    detail: "Parent could not switch between two child profiles."
  }
] as const;

export const worlds = [
  {
    name: "Huruf Island",
    theme: "Letter discovery and tracing",
    status: "Live",
    accent: "bg-sky/55",
    levels: [
      { name: "Splash Path", focus: "Alif to Tha", state: "Healthy" },
      { name: "Cloud Bridge", focus: "Letter sounds", state: "Needs audio polish" },
      { name: "Star Harbor", focus: "Tracing rhythm", state: "Ready for QA" }
    ]
  },
  {
    name: "Story Forest",
    theme: "Listening, sequencing, and adab",
    status: "Tune-up",
    accent: "bg-mint/70",
    levels: [
      { name: "Lantern Trail", focus: "Story sequencing", state: "Live" },
      { name: "Kindness Grove", focus: "Choice moments", state: "Watch progress" },
      { name: "Owl Clearing", focus: "Narration pacing", state: "Rewrite scene 2" }
    ]
  },
  {
    name: "Kalimah Castle",
    theme: "Core phrases and badge unlocks",
    status: "In build",
    accent: "bg-peach/70",
    levels: [
      { name: "Gate of Salaam", focus: "Greeting phrases", state: "Ready for art" },
      { name: "Echo Hall", focus: "Repeat after audio", state: "Script locked" },
      { name: "Moon Tower", focus: "Reward recap", state: "Prototype only" }
    ]
  },
  {
    name: "Doa Village",
    theme: "Daily duas with scene-based practice",
    status: "In build",
    accent: "bg-sun/80",
    levels: [
      { name: "Morning Market", focus: "Wake-up doa", state: "Audio casting" },
      { name: "Rainy Courtyard", focus: "Weather doa", state: "Storyboard ready" },
      { name: "Sleepy Lane", focus: "Bedtime routine", state: "Needs final text" }
    ]
  }
] as const;

export const worldStats = [
  { label: "Worlds live", value: "2" },
  { label: "Levels mapped", value: "12" },
  { label: "Questions tied to levels", value: "148" },
  { label: "Rewards configured", value: "34" }
] as const;

export const contentPillars = [
  {
    title: "Questions",
    count: "148 items",
    summary: "Audio-first prompts, image picks, and simple feedback moments linked to levels."
  },
  {
    title: "Stories",
    count: "19 scenes",
    summary: "Short narrative chapters that teach adab, sequencing, and memory through voice."
  },
  {
    title: "Doa",
    count: "24 cards",
    summary: "Situation-based duas grouped by morning, meals, travel, weather, and sleep."
  },
  {
    title: "Dictionary",
    count: "63 entries",
    summary: "Picture-word cards with transliteration, Arabic text, and listening support."
  }
] as const;

export const editorialPipeline = [
  {
    stage: "Draft",
    items: ["5 question sets", "2 doa cards", "1 dictionary batch"]
  },
  {
    stage: "Arabic review",
    items: ["Kalimah Castle script", "Doa Village bedtime copy"]
  },
  {
    stage: "Audio booth",
    items: ["Huruf Island retake", "Story Forest narration pack"]
  },
  {
    stage: "Ready to publish",
    items: ["Animal dictionary set", "Meal-time doa series"]
  }
] as const;

export const contentChecks = [
  {
    title: "Staff checklist",
    items: [
      "Keep story lines under six spoken beats for preschool attention span.",
      "Match reward wording to the map vocabulary children already see in-game.",
      "Verify Arabic, transliteration, and narration all follow the same approved source."
    ]
  },
  {
    title: "Fresh this week",
    items: [
      "New question type for drag-and-match picture prompts",
      "Parent-facing note for what each doa level reinforces",
      "Dictionary tag cleanup so search works by theme and world"
    ]
  }
] as const;
