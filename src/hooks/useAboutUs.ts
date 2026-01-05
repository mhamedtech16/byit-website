import { useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { AboutUsResponse } from "@/types/AboutUs";

export function useAboutUs() {
  const [data, setData] = useState<AboutUsResponse | null>(null);
  const { getAboutUs } = useGetApisV2();

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const res = await getAboutUs();
        setData(res.data);
      } catch (err: unknown) {
        console.error(err);
      }
    };
    fetchAboutUs();
  }, [getAboutUs]);

  return { data };
}
