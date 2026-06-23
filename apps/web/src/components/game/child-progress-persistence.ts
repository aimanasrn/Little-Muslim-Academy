"use client";

import { useRef, useState } from "react";
import type { WorldKey } from "@little-muslim/shared";
import { fetchParentOverview, saveChildProgress, type ParentOverviewResponse } from "../../lib/api";
import { useAuth } from "../auth/auth-provider";

type ActiveChild = NonNullable<ParentOverviewResponse["activeChild"]>;

export type ProgressSaveNotice = {
  tone: "idle" | "saving" | "success" | "preview" | "error";
  message: string | null;
};

export type SaveWorldProgressInput = {
  completionKey: string;
  earnedStars: number;
  earnedCoins: number;
  currentWorldKey: WorldKey;
};

function getUnlockedWorldKey(currentWorldKey: WorldKey) {
  if (currentWorldKey === "huruf-island") {
    return "story-forest" as const;
  }

  if (currentWorldKey === "writing-garden") {
    return "doa-village" as const;
  }

  return currentWorldKey;
}

export function buildChildProgressUpdate(
  activeChild: ActiveChild,
  progress: Omit<SaveWorldProgressInput, "completionKey">
) {
  return {
    childId: activeChild.id,
    payload: {
      childId: activeChild.id,
      starsEarned: progress.earnedStars,
      coinsEarned: progress.earnedCoins,
      currentWorldKey: getUnlockedWorldKey(progress.currentWorldKey)
    }
  };
}

export function getPreviewProgressMessage(mode: "guest" | "demo" | "missing-child") {
  if (mode === "missing-child") {
    return "Add a child profile from the parent area to save stars and coins after each game.";
  }

  return "Preview mode is on, so this celebration stays in the demo and does not save yet.";
}

function getSaveErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "We could not save this progress just now, but your child can keep playing.";
}

export function useChildProgressPersistence() {
  const { token, user, isLoading } = useAuth();
  const savedCompletionsRef = useRef(new Set<string>());
  const [notice, setNotice] = useState<ProgressSaveNotice>({ tone: "idle", message: null });

  async function saveWorldProgress(input: SaveWorldProgressInput) {
    if (savedCompletionsRef.current.has(input.completionKey) || isLoading) {
      return;
    }

    if (!token || !user) {
      savedCompletionsRef.current.add(input.completionKey);
      setNotice({
        tone: "preview",
        message: getPreviewProgressMessage("guest")
      });
      return;
    }

    if (!user.hasLifetimeAccess) {
      savedCompletionsRef.current.add(input.completionKey);
      setNotice({
        tone: "preview",
        message: getPreviewProgressMessage("demo")
      });
      return;
    }

    try {
      setNotice({
        tone: "saving",
        message: "Saving this celebration to your child profile..."
      });

      const overview = await fetchParentOverview(token);
      const activeChild = overview.activeChild;

      if (!activeChild) {
        savedCompletionsRef.current.add(input.completionKey);
        setNotice({
          tone: "preview",
          message: getPreviewProgressMessage("missing-child")
        });
        return;
      }

      const update = buildChildProgressUpdate(activeChild, input);
      await saveChildProgress(token, update.payload);
      savedCompletionsRef.current.add(input.completionKey);
      setNotice({
        tone: "success",
        message: "Saved to your child profile. Stars, coins, and world progress are up to date."
      });
    } catch (error) {
      setNotice({
        tone: "error",
        message: getSaveErrorMessage(error)
      });
    }
  }

  return { notice, saveWorldProgress };
}
