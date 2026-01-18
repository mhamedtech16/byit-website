"use client";

import { useEffect, useState, useCallback } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { Historys } from "@/types/History";

const useHistory = () => {
  const [history, setHistory] = useState<Historys[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dealType, setDealType] = useState<string>("contracted");

  const { getDealsApi } = useGetApisV2();

  const fetchHistory = useCallback(
    async (page: number, dealType: string) => {
      setLoading(true);
      setDealType(dealType);
      setError(null);
      try {
        const res = await getDealsApi(dealType);
        setHistory(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    },
    [getDealsApi]
  );

  useEffect(() => {
    fetchHistory(1, dealType);
  }, [dealType, fetchHistory]);

  return { history, loading, error, dealType, refetch: fetchHistory };
};

export default useHistory;
