"use client";

import { Building } from "lucide-react";

import NoData from "@/components/NoData";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { colors } from "@/constants/colors";
import { useMobile } from "@/hooks/useMobile";
import { useSharedProperties } from "@/hooks/useSharedProperties";
import { cn } from "@/shadcn/lib/utils";

import SharedPropertyListItem from "./SharedPropertyListItem";

const SharedPropertiesList = () => {
  const isMobile = useMobile();

  const { data, loading } = useSharedProperties();

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
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedPropertiesList;
