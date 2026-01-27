"use client";
import React, { useEffect, useState } from "react";

import useGetApis from "@/Apis/useGetApis";
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
import { NewLaunch } from "@/types/Properties";

import NewLaunchItem from "./components/NewLaunchItem";

const NewLaunches = () => {
  const { getAllNewLaunchesApi } = useGetApis();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [newLaunches, setNewLaunches] = useState<NewLaunch[]>();

  const getNewLaunches = React.useCallback(
    (page: number, search: string, developerId: number) => {
      getAllNewLaunchesApi(page, search, developerId)
        .then((res) => {
          setNewLaunches(res.data.data);
          setTotalPages(res.data.pageCount);
        })
        .catch(() => {});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    getNewLaunches(page, "", 0);
  }, [getNewLaunches, page]);
  return (
    <div className="flex flex-col bg-primary px-5 pb-2">
      {newLaunches?.map((item, index) => (
        <NewLaunchItem item={item} key={index} />
      ))}
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

export default NewLaunches;
