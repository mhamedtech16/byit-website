"use client";

import { useEffect, useState, useCallback } from "react";

import useGetApis from "@/Apis/v1/useGetApis";
import { useAuthStore } from "@/store/authStore";
import { History } from "@/types/History";

const useHistory = () => {
  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const { getDealsApi } = useGetApis();

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDealsApi(currentUser);
      setHistory(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  }, [getDealsApi, currentUser]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};

export default useHistory;
