"use client";

import { AxiosError } from "axios";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import NoData from "@/components/NoData";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { FavouriteSidebar } from "@/components/ui/FavouriteSidebar";
import MobileNavigationSelect from "@/components/ui/MobileNavigationSelect";
import { colors } from "@/constants/colors";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useFavouritesStore } from "@/store/favourites";
import { Property, NewLaunch } from "@/types/Properties";

import NewLaunchItem from "../../NewLaunches/components/NewLaunchItem";
import PropertyListItem from "../../PropertiesList/components/PropertyListItem";

export default function Page() {
  const t = useTranslations("Settings");
  const currentUser = useAuthStore((state) => state.currentUser);
  const favProperties = useFavouritesStore(
    (state) => state.favouritesProperties
  );
  const favNewLaunches = useFavouritesStore(
    (state) => state.favouritesNewLaunches
  );
  const { getFavouritesApi } = useGetApis();
  const isMobile = useMobile();
  const { setFavouritesProperties, setFavouritesNewlaunches } =
    useFavouritesStore();
  const [favouriteType, setFavouriteType] = useState<string>("PROPERTY");
  const [loadingPg, setLoadingPg] = useState(true);
  const [favourites, setFavourites] = useState<Property[] | NewLaunch[]>([]);
  console.log(favourites);

  const getFavourites = useCallback(
    (page: number, type: string) => {
      setLoadingPg(true);

      setFavouriteType(type);
      setFavourites([]);

      getFavouritesApi(page, type, currentUser)
        .then((res) => {
          if (type === "PROPERTY") {
            setFavouritesProperties(res.data.data);
          } else {
            setFavouritesNewlaunches(res.data.data);
          }
          setFavourites(res.data.data);
        })
        .catch((err: unknown) => {
          const error = err as AxiosError;
          console.error("Error getting favourites:", error);
        })
        .finally(() => {
          setLoadingPg(false);
        });
    },
    [
      currentUser,
      getFavouritesApi,
      setFavouritesNewlaunches,
      setFavouritesProperties,
    ]
  );

  useEffect(() => {
    getFavourites(1, "PROPERTY");
  }, [getFavourites]);

  if (loadingPg) {
    return <SkeletonLoading />;
  }
  return (
    <div
      className={cn(
        isMobile
          ? "bg-primary overflow-hidden"
          : "flex justify-between w-full p-16 mx-auto pt-4 bg-primary"
      )}
    >
      {isMobile ? (
        <div className="absolute w-full">
          <MobileNavigationSelect
            onChoiceCallback={getFavourites}
            label="settings"
            activeValue={favouriteType}
            options={[
              {
                label: t("properties"),
                value: "PROPERTY",
                callbackParams: { page: 1, type: "PROPERTY" },
              },
              {
                label: t("newLaunches"),
                value: "NEW-LAUNCH",
                callbackParams: { page: 1, type: "NEW-LAUNCH" },
              },
            ]}
          />
        </div>
      ) : (
        <FavouriteSidebar
          onChoiceCallback={getFavourites}
          activeType={favouriteType}
        />
      )}

      <div
        className={cn(
          "flex flex-col",
          isMobile ? "w-full mt-14 p-4" : "w-[80%]"
        )}
      >
        {(favouriteType == "PROPERTY" ? favProperties : favNewLaunches)
          ?.length === 0 ? (
          <NoData
            imageSrc={<Heart size={100} color={colors.white} />}
            message="yourFavIsEmpty"
          />
        ) : (
          (favouriteType == "PROPERTY" ? favProperties : favNewLaunches)?.map(
            (item, index) =>
              favouriteType == "PROPERTY" ? (
                <div key={item.id}>
                  {index !== 0 && <div className="my-[2vmin]" />}
                  <PropertyListItem key={item.id} item={item as Property} />
                </div>
              ) : (
                <div key={item.id}>
                  {index !== 0 && <div className="my-[2vmin]" />}
                  <NewLaunchItem key={item.id} item={item as NewLaunch} />
                </div>
              )
          )
        )}
      </div>
    </div>
  );
}
