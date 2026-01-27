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
import { getVisiblePages } from "@/lib/VisiblePages";
import { Button } from "@/shadcn/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/components/ui/pagination";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Project, Property } from "@/types/Properties";

import PropertiesFilter from "./PropertiesFilter";
import PropertyListItem from "./PropertyListItem";

const PropertiesList = () => {
  const params = useSearchParams();
  const projectIdFromQuery = Number(params.get("project"));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const currentUser = useAuthStore((state) => state.currentUser);
  const isMobile = useMobile();
  const isRTL = useIsRTL();
  const searchParams = useSearchParams();
  const { getPropertiesApi } = useGetApis();
  const propertyType = searchParams.get("propertyType") || "";

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
      selectedProject?: Project,
    ) => {
      setLoadingPg(true);

      const projectToFetch =
        projectIdFromQuery && !selectedProject
          ? ({ id: projectIdFromQuery } as Project)
          : selectedProject;

      getPropertiesApi(
        projectToFetch && !isFilterP ? [] : selectedLocationIds,
        projectToFetch && !isFilterP ? [] : selectedTypeIds,
        projectToFetch && !isFilterP ? [] : selectedDeliveryTypes,
        projectToFetch && !isFilterP ? [] : selectedFinishingTypes,
        projectToFetch && !isFilterP ? [] : selectedBedroom,
        projectToFetch || null,
        fromPrice,
        toPrice,
        isFilterP,
        page,
        propertyType,
        currentUser,
        projectIdFromQuery,
      )
        .then((res) => {
          setProperties((prev) => {
            const combined =
              isFilterP || refresh
                ? res.data.data
                : [...prev, ...res.data.data];

            const unique = Array.from(
              new Map(combined.map((item) => [item.id, item])).values(),
            );

            return unique;
          });
          setTotalPages(res.data.pageCount);
        })
        .catch((err: unknown) => {
          const error = err as AxiosError;
          console.error("Failed to fetch properties:", error);
        })
        .finally(() => {
          setLoadingPg(false);
        });
    },
    [currentUser, getPropertiesApi, projectIdFromQuery, propertyType],
  );

  useEffect(() => {
    fetchProperties(page, true, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType, page]);

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
              ),
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
                  toPrice,
                ) =>
                  fetchProperties(
                    page,
                    true,
                    true,
                    selectedLocationIds,
                    selectedTypeIds,
                    selectedDeliveryTypes,
                    selectedFinishingTypes,
                    selectedBedroom,
                    fromPrice,
                    toPrice,
                    selectedCompound,
                  )
                }
              />
            </ModalDemo>
          </>
        ) : (
          <div
            className={cn(
              "w-[28%] bg-white max-h-[85vh] fixed overflow-y-auto p-4 rounded-xl shadow-md",
              isRTL ? "left-10" : "right-10",
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
                toPrice,
              ) =>
                fetchProperties(
                  page,
                  true,
                  true,
                  selectedLocationIds,
                  selectedTypeIds,
                  selectedDeliveryTypes,
                  selectedFinishingTypes,
                  selectedBedroom,
                  fromPrice,
                  toPrice,
                  selectedCompound,
                )
              }
            />
          </div>
        )}
      </div>
      <Pagination className="mt-10 mb-10">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                if (page === 1) {
                  e.preventDefault();
                  return;
                }
                setPage((p) => p - 1);
              }}
              className={cn(
                "text-white",
                page === 1 ? "opacity-50 cursor-not-allowed" : "text-white",
              )}
            />
          </PaginationItem>

          {/* Pages */}
          {getVisiblePages(page, totalPages).map((p, i) => {
            if (p === "...") {
              return (
                <PaginationItem key={`dots-${i}`}>
                  <span className="px-3 text-white">…</span>
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  className={cn(
                    "text-white",
                    page === p && "bg-white text-black",
                  )}
                  onClick={() => setPage(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                if (page === totalPages) {
                  e.preventDefault();
                  return;
                } else if (totalPages === 0) {
                  e.preventDefault();
                  return;
                }
                setPage((p) => p + 1);
              }}
              className={cn(
                "text-white",
                page === totalPages ? "opacity-50 cursor-not-allowed" : "",
                totalPages === 0 ? "opacity-50 cursor-not-allowed" : "",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PropertiesList;
