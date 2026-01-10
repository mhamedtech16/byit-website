"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { Leads } from "@/types/Campaigns";
import { User } from "@/types/User";

export default function useLeads(
  user: User | null,
  campaignId?: number | null
) {
  const { getLeadsApi } = useGetApis();
  const [leads, setLeads] = useState<Leads[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setLeads(null);
      return;
    }

    getLeadsApi(user)
      .then((res) => {
        const allLeads = res.data.data;

        // لو فيه campaignId فلتر فقط اللي تبع نفس الحملة
        const filtered = campaignId
          ? allLeads.filter((lead: Leads) => lead.campaign?.id === campaignId)
          : allLeads;

        setLeads(filtered);
      })
      .catch((err) => {
        console.error("API Error (getLeadsApi): ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getLeadsApi, user, campaignId]);

  return { leads, loading, error };
}
