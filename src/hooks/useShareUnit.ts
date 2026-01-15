import { useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { ShareUnit } from "@/types/ShareUnit";

export const useShareUnit = () => {
  const [shareUnit, setShareUnit] = useState<ShareUnit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const { getSharedUnitApi } = useGetApisV2();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getSharedUnitApi();
        setShareUnit(res.data?.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getSharedUnitApi]);

  return { shareUnit, loading, error };
};
