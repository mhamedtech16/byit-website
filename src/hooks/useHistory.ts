"use client";

import { useEffect, useState, useCallback } from "react";

import useGetApis from "@/Apis/useGetApis";
import { useAuthStore } from "@/store/authStore";
import { History } from "@/types/History";

const useHistory = (page: number, limit: number) => {
  const [history, setHistory] = useState<History[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [dealType, setDealType] = useState<string>("CONTRACTED");

  const { getDealsApi } = useGetApis();

  const fetchHistory = useCallback(
    async (type: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await getDealsApi(currentUser, page, limit, type);
        setHistory(res.data?.data || []);
        setTotalPages(res.data?.pageCount);
        setDealType(type);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    },
    [getDealsApi, currentUser, page, limit],
  );

  useEffect(() => {
    fetchHistory(dealType);
  }, [fetchHistory, dealType]);

  return {
    history,
    loading,
    error,
    totalPages,
    dealType,
    refetch: fetchHistory,
  };
};

export default useHistory;
