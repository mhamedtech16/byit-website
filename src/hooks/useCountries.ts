// hooks/useCountries.ts
"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/v1/useGetApis";
import { DropdownCountry } from "@/types/User";

export const useCountries = () => {
  const [countries, setCountries] = useState<DropdownCountry[]>([]);
  const { getAllCountriesApi } = useGetApis();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getAllCountriesApi();
        setCountries(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, [getAllCountriesApi]);

  return { countries };
};
