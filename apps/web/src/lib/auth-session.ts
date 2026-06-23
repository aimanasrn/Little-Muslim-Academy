import type { UserRole } from "@little-muslim/shared";

export const authCookieName = "little_muslim_token";
export const authStorageTokenKey = "little-muslim-token";
export const authStorageUserKey = "little-muslim-user";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  hasLifetimeAccess: boolean;
};

export function writeSession(token: string, user: AuthUser) {
  window.localStorage.setItem(authStorageTokenKey, token);
  window.localStorage.setItem(authStorageUserKey, JSON.stringify(user));
  document.cookie = `${authCookieName}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function clearSession() {
  window.localStorage.removeItem(authStorageTokenKey);
  window.localStorage.removeItem(authStorageUserKey);
  document.cookie = `${authCookieName}=; path=/; max-age=0; samesite=lax`;
}

export function readStoredToken() {
  return window.localStorage.getItem(authStorageTokenKey);
}
