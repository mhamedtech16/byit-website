"use client";

import { useCallback, useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";

type Partners = {
  id: string;
  en_name: string;
  ar_name: string;
};

export const useVendors = () => {
  const [partners, setPartners] = useState<Partners[]>([]);
  const [partnerPage, setPartnerPage] = useState(1);
  const [partnerPages, setPartnerPages] = useState(0);

  const [partnerLoading, setPartnerLoading] = useState(false);
  const { getPartnerApi } = useGetApisV2();

  const fetchPartners = useCallback(
    async (page: number = 1, limit?: number) => {
      try {
        setPartnerLoading(true);
        const response = await getPartnerApi(page, limit || 20);

        if (response?.data?.data) {
          setPartners(response?.data?.data);
          setPartnerPage(response.data.current_page);
          setPartnerPages(response.data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching developers:", error);
      } finally {
        setPartnerLoading(false);
      }
    },
    [getPartnerApi]
  );

  return {
    partners,
    setPartners,
    fetchPartners,
    partnerLoading,
    partnerPage,
    partnerPages,
  };
};
