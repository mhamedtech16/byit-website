import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { NewLaunch, Property } from "@/types/Properties";

import { UserState } from "./types/favourites.types";

const useFavouritesStore = create<UserState>()(
  persist(
    (set) => ({
      favouritesProperties: [],
      favouritesNewLaunches: [],
      setFavouritesProperties: (properties: Property[]) =>
        set({ favouritesProperties: properties }),

      setFavouritesNewlaunches: (newlaunches: NewLaunch[]) =>
        set({ favouritesNewLaunches: newlaunches }),
    }),
    {
      name: "app-favourites", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useFavouritesStore };
export const authStore = useFavouritesStore;
