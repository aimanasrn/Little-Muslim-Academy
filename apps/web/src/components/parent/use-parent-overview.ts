"use client";

import { useEffect, useState } from "react";
import { fetchParentOverview, type ParentOverviewResponse } from "../../lib/api";
import { useAuth } from "../auth/auth-provider";

export function useParentOverview() {
  const { token, user, isLoading } = useAuth();
  const [data, setData] = useState<ParentOverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function loadOverview() {
      if (isLoading) {
        return;
      }

      if (!token || !user) {
        setData(null);
        setIsFetching(false);
        return;
      }

      try {
        setIsFetching(true);
        const overview = await fetchParentOverview(token);
        setData(overview);
        setError(null);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load parent overview");
      } finally {
        setIsFetching(false);
      }
    }

    void loadOverview();
  }, [isLoading, token, user]);

  return { data, error, isFetching };
}
