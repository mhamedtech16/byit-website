"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { Meeting } from "@/types/Meetings";
import { AuthUser } from "@/types/User";

export default function useMeetings(
  user: AuthUser | null,
  startDate: string,
  endDate: string
) {
  const { getMeetingsApi } = useGetApis();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [earning, setEarning] = useState<number>(0);
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
        setMeetings(res.data.data?.data);
        setEarning(res.data.data?.earning?.amount);
      })
      .catch((err) => {
        console.error("API Error (meetings): ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endDate, getMeetingsApi, startDate, user]);

  return { meetings, loading, error, earning };
}
