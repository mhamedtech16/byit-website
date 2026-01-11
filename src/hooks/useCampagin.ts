"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { Campaign } from "@/types/Campaigns";
import { AuthUser } from "@/types/User";

export default function useCampaigns(user: AuthUser | null) {
  const { getCampaignApi } = useGetApis();
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setCampaigns(null);
      return;
    }

    getCampaignApi(user)
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
  }, [getCampaignApi, user]);

  return { campaigns, loading, error };
}
