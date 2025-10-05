"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { DropdownCity } from "@/types/User";

export const useCities = () => {
  const [cities, setCities] = useState<DropdownCity[]>([]);
  const { getAllCitiessApi } = useGetApis();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getAllCitiessApi();
        const cityList: DropdownCity[] =
          res.data?.data.map((city: DropdownCity) => ({
            id: String(city.id),
            name: city.name,
          })) || [];

        setCities(cityList);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [getAllCitiessApi]);

  return { cities };
};
