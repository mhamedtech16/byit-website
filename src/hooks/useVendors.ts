"use client";

import { useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { Projects } from "@/types/PropertiesV2";

type Partners = {
  id: string;
  en_name: string;
  ar_name: string;
};

export const useVendors = () => {
  const [vendors, setVendors] = useState<Partners[]>([]);
  const { getProjectsApi } = useGetApisV2();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await getProjectsApi();
        const vendorsList: Projects[] =
          res.data?.data?.map((pro: Projects) =>
            pro.partners.map((partner: Partners) => ({
              id: partner.id,
              ar_name: partner.ar_name,
              en_name: partner.en_name,
            }))
          ) || [];

        setVendors(vendorsList);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, [getProjectsApi]);

  return { vendors };
};
