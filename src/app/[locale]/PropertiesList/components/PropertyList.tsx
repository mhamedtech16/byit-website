"use client";

import { AxiosError } from "axios";
import { Building, Building2, Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
import ModalDemo from "@/components/Modal";
import NoData from "@/components/NoData";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { colors } from "@/constants/colors";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Project, Property } from "@/types/Properties";

import PropertiesFilter from "./PropertiesFilter";
import PropertyListItem from "./PropertyListItem";

const PropertiesList = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isMobile = useMobile();
  const isRTL = useIsRTL();
  const searchParams = useSearchParams();
  const { getPropertiesApi } = useGetApis();
  const propertyType = searchParams.get("propertyType") || "";
  // console.log(propertyType);

  const [loadingPg, setLoadingPg] = useState(true);

  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchProperties = useCallback(
    (
      page: number,
      refresh: boolean,
      isFilterP: boolean,
      selectedLocationIds: number[] = [],
      selectedTypeIds: number[] = [],
      selectedDeliveryTypes: string[] = [],
      selectedFinishingTypes: string[] = [],
      selectedBedroom: string[] = [],
      fromPrice: number = 0,
      toPrice: number = 0,
      selectedProject?: Project
    ) => {
      setLoadingPg(true);

      getPropertiesApi(
        selectedLocationIds,
        selectedTypeIds,
        selectedDeliveryTypes,
        selectedFinishingTypes,
        selectedBedroom,
        selectedProject || null,
        fromPrice,
        toPrice,
        isFilterP,
        page,
        propertyType,
        currentUser
      )
        .then((res) => {
          setProperties((prev) => {
            const combined =
              isFilterP || refresh
                ? res.data.data
                : [...prev, ...res.data.data];

            const unique = Array.from(
              new Map(combined.map((item) => [item.id, item])).values()
            );

            return unique;
          });
        })
        .catch((err: unknown) => {
          const error = err as AxiosError;
          console.error("Failed to fetch properties:", error);
        })
        .finally(() => {
          setLoadingPg(false);
        });
    },
    [currentUser, getPropertiesApi, propertyType]
  );
  useEffect(() => {
    fetchProperties(1, true, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType]);

  if (loadingPg) {
    return <SkeletonLoading />;
  }

  return (
    <div className="flex flex-col flex-1 w-full mx-auto bg-primary pb-5">
      <div className="flex justify-between w-[90%] mx-auto pt-4 bg-primary">
        <div className={cn("flex flex-col", isMobile ? "w-full" : "w-[70%]")}>
          {properties.length === 0 ? (
            <NoData
              message="noResultFound"
              imageSrc={
                propertyType === "COMPOUND" ? (
                  <Building2 size={200} color={colors.white} />
                ) : (
                  <Building size={200} color={colors.white} />
                )
              }
            />
          ) : (
            properties.map((item, index) =>
              index === 0 ? (
                <PropertyListItem key={item.id} item={item} />
              ) : (
                <div key={item.id}>
                  <div className="my-[2vmin]" />
                  <PropertyListItem item={item} />
                </div>
              )
            )
          )}
        </div>

        {isMobile ? (
          <>
            <div className="fixed right-4 z-50">
              <Button
                variant="icon"
                onClick={() => setFilterVisible((prev) => !prev)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <ModalDemo
              isOpen={filterVisible}
              onClose={() => setFilterVisible(false)}
            >
              <PropertiesFilter
                propertyType={propertyType}
                onFilterPress={(
                  selectedLocationIds,
                  selectedTypeIds,
                  selectedDeliveryTypes,
                  selectedFinishingTypes,
                  selectedBedroom,
                  selectedCompound,
                  fromPrice,
                  toPrice
                ) =>
                  fetchProperties(
                    1,
                    true,
                    true,
                    selectedLocationIds,
                    selectedTypeIds,
                    selectedDeliveryTypes,
                    selectedFinishingTypes,
                    selectedBedroom,
                    fromPrice,
                    toPrice,
                    selectedCompound
                  )
                }
              />
            </ModalDemo>
          </>
        ) : (
          <div
            className={cn(
              "w-[28%] bg-white max-h-[85vh] fixed overflow-y-auto p-4 rounded-xl shadow-md",
              isRTL ? "left-10" : "right-10"
            )}
          >
            <PropertiesFilter
              propertyType={propertyType}
              onFilterPress={(
                selectedLocationIds,
                selectedTypeIds,
                selectedDeliveryTypes,
                selectedFinishingTypes,
                selectedBedroom,
                selectedCompound,
                fromPrice,
                toPrice
              ) =>
                fetchProperties(
                  1,
                  true,
                  true,
                  selectedLocationIds,
                  selectedTypeIds,
                  selectedDeliveryTypes,
                  selectedFinishingTypes,
                  selectedBedroom,
                  fromPrice,
                  toPrice,
                  selectedCompound
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesList;
