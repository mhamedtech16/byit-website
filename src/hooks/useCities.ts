"use client";

import { useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { DropdownCity } from "@/types/User";

export const useCities = () => {
  const [cities, setCities] = useState<DropdownCity[]>([]);
  const { getCitiesApi } = useGetApisV2();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getCitiesApi();
        const cityList: DropdownCity[] =
          res.data?.data.map((city: DropdownCity) => ({
            id: String(city.id),
            name: city.country,
            ar_name: city.ar_name,
            en_name: city.en_name,
          })) || [];

        setCities(cityList);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [getCitiesApi]);

  return { cities };
};
