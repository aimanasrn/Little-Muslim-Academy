"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { fetchCurrentUser } from "../../lib/api";
import { clearSession, readStoredToken, writeSession, type AuthUser } from "../../lib/auth-session";

type AuthContextValue = {
  isLoading: boolean;
  token: string | null;
  user: AuthUser | null;
  signIn: (token: string, user: AuthUser) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function restoreSession() {
      const storedToken = readStoredToken();

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const session = await fetchCurrentUser(storedToken);
        setToken(storedToken);
        setUser(session.user);
        writeSession(storedToken, session.user);
      } catch {
        clearSession();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  function signIn(nextToken: string, nextUser: AuthUser) {
    writeSession(nextToken, nextUser);
    setToken(nextToken);
    setUser(nextUser);
  }

  function signOut() {
    clearSession();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isLoading, token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
