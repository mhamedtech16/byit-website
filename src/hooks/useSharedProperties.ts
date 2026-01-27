import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { SharedPropertiesResponse } from "@/types/Properties";
import { DropdownShareProperties } from "@/types/User";

export function useSharedProperties(page?: number) {
  const [vendors, setVendors] = useState<DropdownShareProperties[]>([]);
  const [data, setData] = useState<SharedPropertiesResponse | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const { getSharedPropertiesApi } = useGetApis();

  useEffect(() => {
    const fetchSharedProperties = async () => {
      try {
        setLoading(true);
        const res = await getSharedPropertiesApi(page || 1);
        setVendors(res.data?.data || []);
        setData(res.data);
        setTotalPages(res.data.pageCount || 0);
      } catch (err: unknown) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSharedProperties();
  }, [getSharedPropertiesApi, page]);

  return { data, loading, error, vendors, totalPages };
}
