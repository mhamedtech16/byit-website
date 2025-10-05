import { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import { AboutUsResponse } from "@/types/AboutUs";

export function useAboutUs() {
  const [data, setData] = useState<AboutUsResponse | null>(null);
  const { getAboutUsApi } = useGetApis();

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const res = await getAboutUsApi();
        setData(res.data);
      } catch (err: unknown) {
        console.error(err);
      }
    };
    fetchAboutUs();
  }, [getAboutUsApi]);

  return { data };
}
