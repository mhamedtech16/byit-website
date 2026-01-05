import { User } from "@/types/User";

import { api } from "./apiInstance";

const usePostApis = () => {
  const addFavouriteApi = (id: number, type: string, user: User) => {
    return api.post(`favourites/${id}/${type}`, [], {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  const removeFromFavoriteApi = (id: number, type: string, user: User) => {
    return api.delete(`favourites/${id}/${type}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  return {
    addFavouriteApi,
    removeFromFavoriteApi,
  };
};

export default usePostApis;
