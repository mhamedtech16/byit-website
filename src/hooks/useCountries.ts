// hooks/useCountries.ts
"use client";

import { useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { DropdownCountry } from "@/types/User";

export const useCountries = () => {
  const [countries, setCountries] = useState<DropdownCountry[]>([]);
  const { getCountiresApi } = useGetApisV2();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountiresApi();
        setCountries(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, [getCountiresApi]);

  return { countries };
};
