"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { Meeting } from "@/types/Meetings";
import { User } from "@/types/User";

export default function useMeetings(
  user: User | null,
  startDate: string,
  endDate: string
) {
  const { getMeetingsApi } = useGetApis();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
      setLoading(true);
      return;
    }

    setLoading(true);
    getMeetingsApi(user, startDate, endDate)
      .then((res) => {
        setMeetings(res.data.data);
      })
      .catch((err) => {
        console.error("API Error (meetings): ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endDate, getMeetingsApi, startDate, user]);

  return { meetings, loading, error };
}
