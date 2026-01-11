"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { Property } from "@/types/Properties";
import { AuthUser } from "@/types/User";

export default function usePropertiesDetails(
  user: AuthUser | null,
  id: number
) {
  const { getPropertyDetailsApi } = useGetApis();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      return;
    }

    setLoading(true);
    getPropertyDetailsApi(user, id)
      .then((res) => {
        setProperty(res.data.data);
      })
      .catch((err) => {
        console.error("API Error (PropertyDetailsApi): ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getPropertyDetailsApi, id, user]);

  return { property, loading, error };
}
