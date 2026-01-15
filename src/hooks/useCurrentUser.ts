import { useEffect } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import { useAuthStore } from "@/store/authStore";

export const useCurrentUser = () => {
  const { getCurrentUserApi } = useGetApisV2();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentUserApi();
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [getCurrentUserApi, setUser]);

  return { user };
};
