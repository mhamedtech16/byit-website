"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { Meeting } from "@/types/Meetings";
import { User } from "@/types/User";

export default function useMeetings(user: User | null) {
  const { getMeetingsApi } = useGetApis();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setMeetings([]);
      return;
    }

    getMeetingsApi(user)
      .then((res) => {
        setMeetings(res.data.data);
      })
      .catch((err) => {
        console.error("API Error (getCampaignApi): ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getMeetingsApi, user]);

  return { meetings, loading, error };
}
