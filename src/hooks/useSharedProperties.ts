import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { SharedPropertiesResponse } from "@/types/Properties";
import { DropdownShareProperties } from "@/types/User";

export function useSharedProperties() {
  const [vendors, setVendors] = useState<DropdownShareProperties[]>([]);
  const [data, setData] = useState<SharedPropertiesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const { getSharedPropertiesApi } = useGetApis();

  useEffect(() => {
    const fetchSharedProperties = async () => {
      try {
        setLoading(true);
        const res = await getSharedPropertiesApi();
        setVendors(res.data?.data || []);
        setData(res.data);
      } catch (err: unknown) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSharedProperties();
  }, [getSharedPropertiesApi]);

  return { data, loading, error, vendors };
}
