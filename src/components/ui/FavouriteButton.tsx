import React from "react";

import { addFavouriteApi } from "@/Apis/v2/usePostApis";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useFavouritesStore } from "@/store/favourites";
import { NewLaunch, ProjectsUnit } from "@/types/PropertiesV2";

type Props = {
  item: ProjectsUnit | NewLaunch | undefined;
  favoriteType: string;
};

const FavouriteButton = ({ item, favoriteType }: Props) => {
  const isMobile = useMobile();

  const currentUser = useAuthStore((state) => state.currentUser);
  const favProperties = useFavouritesStore(
    (state) => state.favouritesProperties,
  );
  const favNewLaunches = useFavouritesStore(
    (state) => state.favouritesNewLaunches,
  );

  const { setFavouritesProperties, setFavouritesNewlaunches } =
    useFavouritesStore();

  const isProjectUnit = favoriteType === "Project Units";

  const isFavorite = isProjectUnit
    ? favProperties.some((i) => i.id === item?.id)
    : favNewLaunches.some((i) => i.id === item?.id);

  const addAndRemoveFavorite = () => {
    if (!currentUser) return;

    const nextValue = !isFavorite;

    addFavouriteApi(
      item?.id,
      isProjectUnit ? "Project Units" : "New Launch",
      nextValue,
    )
      .then(() => {
        if (isProjectUnit) {
          setFavouritesProperties(
            nextValue
              ? [item as ProjectsUnit, ...favProperties] // Add Fav
              : favProperties.filter((i) => i.id !== item?.id), // Remove Fav
          );
        } else {
          setFavouritesNewlaunches(
            nextValue
              ? [item as NewLaunch, ...favNewLaunches]
              : favNewLaunches.filter((i) => i.id !== item?.id),
          );
        }
      })
      .catch(console.error);
  };

  return (
    <button
      className={cn(
        "rounded-full bg-[var(--primary)] flex justify-center items-center shadow-md",
        isMobile ? "w-[8vmin] h-[8vmin]" : "w-[5vmin] h-[5vmin]",
      )}
      onClick={addAndRemoveFavorite}
    >
      {isFavorite ? (
        <i
          className={cn(
            "fa-solid fa-heart text-[3vmin] text-white",
            isMobile ? "text-[5vmin]" : "text-[3vmin]",
          )}
        ></i>
      ) : (
        <i
          className={cn(
            "fa-regular fa-heart text-[3vmin] text-white",
            isMobile ? "text-[5vmin]" : "text-[3vmin]",
          )}
        ></i>
      )}
    </button>
  );
};

export default FavouriteButton;
