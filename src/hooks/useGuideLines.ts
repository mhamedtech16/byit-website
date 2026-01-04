"use client";

import { useState, useEffect, useCallback } from "react";

import useGetApis from "@/Apis/v1/useGetApis";
import { GuideLines } from "@/types/GuideLines";

export const useGuideLines = () => {
  const [guideLines, setGuideLines] = useState<GuideLines[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getGuideLinesApi } = useGetApis();

  const fetchGuideLines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getGuideLinesApi();
      setGuideLines(res.data?.data || null);
    } catch (err) {
      console.error("Failed to fetch guidelines:", err);
      setError("Failed to load guidelines");
    } finally {
      setLoading(false);
    }
  }, [getGuideLinesApi]);

  useEffect(() => {
    fetchGuideLines();
  }, [fetchGuideLines]);

  return { guideLines, loading, error, refetch: fetchGuideLines };
};
