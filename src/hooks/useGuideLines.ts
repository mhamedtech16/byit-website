"use client";

import { useState, useEffect, useCallback } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { VideoGallery } from "@/types/GuideLines";

export const useGuideLines = () => {
  const [guideLines, setGuideLines] = useState<VideoGallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getVideoGallaryApi } = useGetApisV2();

  const fetchGuideLines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getVideoGallaryApi();
      setGuideLines(res.data?.data || null);
    } catch (err) {
      console.error("Failed to fetch guidelines:", err);
      setError("Failed to load guidelines");
    } finally {
      setLoading(false);
    }
  }, [getVideoGallaryApi]);

  useEffect(() => {
    fetchGuideLines();
  }, [fetchGuideLines]);

  return { guideLines, loading, error, refetch: fetchGuideLines };
};
