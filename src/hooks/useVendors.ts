"use client";

import { useEffect, useState } from "react";

import useGetApis from "@/Apis/v1/useGetApis";
import { DropdownVendors } from "@/types/User";

export const useVendors = () => {
  const [vendors, setVendors] = useState<DropdownVendors[]>([]);
  const { getVendorsApi } = useGetApis();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getVendorsApi();
        const vendorsList: DropdownVendors[] =
          res.data?.data.map((vendor: DropdownVendors) => ({
            id: String(vendor.id),
            name: vendor.name,
            name_en: vendor.name_en,
            name_ar: vendor.name_ar,
          })) || [];

        setVendors(vendorsList);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [getVendorsApi]);

  return { vendors };
};
