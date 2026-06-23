export const USER_ROLES = ["parent", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];
