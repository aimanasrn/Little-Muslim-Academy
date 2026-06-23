export const APP_LANGUAGES = ["ms", "en"] as const;

export type AppLanguage = (typeof APP_LANGUAGES)[number];
