"use client";

import { Building } from "lucide-react";
import { useState } from "react";

import NoData from "@/components/NoData";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { colors } from "@/constants/colors";
import { useMobile } from "@/hooks/useMobile";
import { useSharedProperties } from "@/hooks/useSharedProperties";
import { getVisiblePages } from "@/lib/VisiblePages";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/components/ui/pagination";
import { cn } from "@/shadcn/lib/utils";

import SharedPropertyListItem from "./SharedPropertyListItem";

const SharedPropertiesList = () => {
  const isMobile = useMobile();
  const [page, setPage] = useState(1);
  const { data, loading, totalPages } = useSharedProperties(page);

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="flex flex-col flex-1 w-full mx-auto bg-primary pb-5">
      <div className="flex justify-between w-[90%] mx-auto pt-4 bg-primary">
        <div className={cn("flex flex-col", isMobile ? "w-full" : "w-full")}>
          {data?.data.length === 0 ? (
            <NoData
              message="noResultFound"
              imageSrc={<Building size={200} color={colors.white} />}
            />
          ) : (
            data?.data.map((item, index) =>
              index === 0 ? (
                <SharedPropertyListItem key={item.id} item={item} />
              ) : (
                <div key={item.id}>
                  <div className="my-[2vmin]" />
                  <SharedPropertyListItem item={item} />
                </div>
              ),
            )
          )}
        </div>
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

export default SharedPropertiesList;
