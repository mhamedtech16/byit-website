import React, { useState } from "react";

import usePostApis from "@/Apis/usePostApis";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useFavouritesStore } from "@/store/favourites";
import { NewLaunch, Property } from "@/types/Properties";

type Props = {
  item: Property | NewLaunch | null;
  favoriteType: string;
  isItemFavorite: boolean | undefined;
};

const FavouriteButton = ({ item, favoriteType, isItemFavorite }: Props) => {
  const isMobile = useMobile();

  const currentUser = useAuthStore((state) => state.currentUser);
  const favProperties = useFavouritesStore(
    (state) => state.favouritesProperties
  );
  const favNewLaunches = useFavouritesStore(
    (state) => state.favouritesNewLaunches
  );
  const { setFavouritesProperties, setFavouritesNewlaunches } =
    useFavouritesStore();
  const { addFavouriteApi, removeFromFavoriteApi } = usePostApis();
  const [isFavorite, setIsFavorite] = useState(isItemFavorite);

  const addFavorite = () => {
    if (!currentUser) return;
    addFavouriteApi(
      item?.id ?? 0,
      favoriteType == "Property" ? "addProperty" : "addNewLaunch",
      currentUser
    )
      .then(() => {
        setIsFavorite(true);
        if (favoriteType == "Property") {
          if (
            "type" in (item ?? {}) &&
            "priceType" in (item ?? {}) &&
            "price" in (item ?? {}) &&
            "downPayment" in (item ?? {})
          ) {
            setFavouritesProperties([item as Property, ...favProperties]);
          }
        } else {
          setFavouritesNewlaunches([item as NewLaunch, ...favNewLaunches]);
        }
      })
      .catch(console.error);
  };

  const removeFavorite = () => {
    if (!currentUser) return;
    removeFromFavoriteApi(
      item?.id ?? 0,
      favoriteType == "Property" ? "removeProperty" : "removeNewLaunch",
      currentUser
    )
      .then(() => {
        if (favoriteType == "Property") {
          setFavouritesProperties(
            favProperties.filter((i) => i.id != item?.id)
          );
        } else {
          setFavouritesNewlaunches(
            favNewLaunches.filter((i) => i.id != item?.id)
          );
        }
        setIsFavorite(false);
      })
      .catch(console.error);
  };

  return (
    <button
      className={cn(
        "rounded-full bg-[var(--primary)] flex justify-center items-center shadow-md",
        isMobile ? "w-[8vmin] h-[8vmin]" : "w-[5vmin] h-[5vmin]"
      )}
      onClick={() =>
        favoriteType == "Property"
          ? favProperties.some((i) => i.id == item?.id)
            ? removeFavorite()
            : addFavorite()
          : favNewLaunches.some((i) => i.id == item?.id)
          ? removeFavorite()
          : addFavorite()
      }
    >
      {isFavorite ? (
        <i
          className={cn(
            "fa-solid fa-heart text-[3vmin] text-white",
            isMobile ? "text-[5vmin]" : "text-[3vmin]"
          )}
        ></i>
      ) : (
        <i
          className={cn(
            "fa-regular fa-heart text-[3vmin] text-white",
            isMobile ? "text-[5vmin]" : "text-[3vmin]"
          )}
        ></i>
      )}
    </button>
  );
};

export default FavouriteButton;
