"use client";

import { AxiosError } from "axios";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import useGetApisV2 from "@/Apis/v2/useGetApis";
import NoData from "@/components/NoData";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { FavouriteSidebar } from "@/components/ui/FavouriteSidebar";
import MobileNavigationSelect from "@/components/ui/MobileNavigationSelect";
import { colors } from "@/constants/colors";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/shadcn/lib/utils";
import { useFavouritesStore } from "@/store/favourites";
import { NewLaunch, ProjectsUnit } from "@/types/PropertiesV2";

import NewLaunchItem from "../../NewLaunches/components/NewLaunchItem";
import PropertyListItem from "../../PropertiesList/components/PropertyListItem";

export default function Page() {
  const t = useTranslations("Settings");
  const favProperties = useFavouritesStore(
    (state) => state.favouritesProperties,
  );
  const favNewLaunches = useFavouritesStore(
    (state) => state.favouritesNewLaunches,
  );
  const { getProjectsUnitsApi, getNewLaunchApi } = useGetApisV2();
  const isMobile = useMobile();
  const { setFavouritesProperties, setFavouritesNewlaunches } =
    useFavouritesStore();
  const [favouriteType, setFavouriteType] = useState<string>("Projects Unit");
  const [loadingPg, setLoadingPg] = useState(true);
  const [favourites, setFavourites] = useState<ProjectsUnit[] | NewLaunch[]>(
    [],
  );
  console.log(favourites);

  console.log(getProjectsUnitsApi("", true).then((res) => res.data));

  const getFavourites = useCallback(
    (page: number, type: string) => {
      setLoadingPg(true);

      setFavouriteType(type);
      setFavourites([]);
      if (type === "Projects Unit") {
        getProjectsUnitsApi("", true)
          .then((res) => {
            console.log("Type", res.data.data);

            setFavouritesProperties(res.data.data);

            setFavourites(res.data.data);
          })
          .catch((err: unknown) => {
            const error = err as AxiosError;
            console.error("Error getting favourites:", error);
          })
          .finally(() => {
            setLoadingPg(false);
          });
      } else if (type === "New Launch") {
        getNewLaunchApi(true)
          .then((res) => {
            console.log("Type", res.data.data);

            setFavouritesNewlaunches(res.data.data);

            setFavourites(res.data.data);
          })
          .catch((err: unknown) => {
            const error = err as AxiosError;
            console.error("Error getting favourites:", error);
          })
          .finally(() => {
            setLoadingPg(false);
          });
      }
    },
    [
      getNewLaunchApi,
      getProjectsUnitsApi,
      setFavouritesNewlaunches,
      setFavouritesProperties,
    ],
  );

  useEffect(() => {
    getFavourites(1, "Projects Unit");
  }, [getFavourites]);

  if (loadingPg) {
    return <SkeletonLoading />;
  }
  return (
    <div
      className={cn(
        isMobile
          ? "bg-primary overflow-hidden"
          : "flex justify-between w-full p-16 mx-auto pt-4 bg-primary",
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
                value: "Projects Unit",
                callbackParams: { page: 1, type: "Projects Unit" },
              },
              {
                label: t("newLaunches"),
                value: "New Launch",
                callbackParams: { page: 1, type: "New Launch" },
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
          isMobile ? "w-full mt-14 p-4" : "w-[80%]",
        )}
      >
        {(favouriteType == "Projects Unit" ? favProperties : favNewLaunches)
          ?.length === 0 ? (
          <NoData
            imageSrc={<Heart size={100} color={colors.white} />}
            message="yourFavIsEmpty"
          />
        ) : (
          (favouriteType == "Projects Unit"
            ? favProperties
            : favNewLaunches
          )?.map((item, index) =>
            favouriteType == "Projects Unit" ? (
              <div key={item.id}>
                {index !== 0 && <div className="my-[2vmin]" />}
                <PropertyListItem key={item.id} item={item as ProjectsUnit} />
              </div>
            ) : (
              <div key={item.id}>
                {index !== 0 && <div className="my-[2vmin]" />}
                <NewLaunchItem key={item.id} item={item as NewLaunch} />
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
}
