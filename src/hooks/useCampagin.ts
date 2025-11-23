"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { Campaign } from "@/types/Campaigns";

export default function useCampaigns() {
  const { getCampaignApi } = useGetApis();
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCampaignApi()
      .then((res) => {
        setCampaigns(res.data.data);
      })
      .catch((err) => {
        console.error("API Error (getCampaignApi): ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getCampaignApi]);

  return { campaigns, loading, error };
}
