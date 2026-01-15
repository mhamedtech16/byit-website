"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { getUserDataApi } from "@/Apis/v1/Auth";
import useGetApis from "@/Apis/v1/useGetApis";
import useGetApisV2 from "@/Apis/v2/useGetApis";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/shadcn/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { PrizesData, TargetPoint } from "@/types/Contests";

import { ContestsStep } from "./components/ContestsStep";

const Contests = () => {
  const isMobile = useMobile();
  const currentUser = useAuthStore((state) => state.currentUser);
  const { getAppSettingApi } = useGetApis();
  const { getAboutUsApi } = useGetApisV2();
  const [prizesData, setPrizesData] = useState<PrizesData>();
  const [userTargetAchievement, setUserTargetAchievement] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getUserLevelIndex = useCallback(
    (targetPoints: TargetPoint[], userTargetAchievement: number) => {
      if (!targetPoints?.length) return -1;

      return targetPoints.findIndex((i, ind) => {
        const currentMin = i.point * 1000000;
        const nextMin = targetPoints[ind + 1]?.point * 1000000;

        return (
          userTargetAchievement >= currentMin &&
          (!targetPoints[ind + 1] || userTargetAchievement < nextMin)
        );
      });
    },
    []
  );

  const getAppSetting = useCallback(() => {
    getAboutUsApi()
      .then((response) => {
        setPrizesData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [getAboutUsApi]);

  const getUserData = useCallback(() => {
    getUserDataApi(currentUser)
      .then((response) => {
        setUserTargetAchievement(response.data.data.targetAchievement);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser]);

  useEffect(() => {
    getAppSetting();
    getUserData();
  }, [getAppSetting, getUserData]);

  useEffect(() => {
    const index = getUserLevelIndex(
      prizesData?.targetPoints || [],
      userTargetAchievement
    );
    const targetElement = stepRefs.current[index];

    if (
      targetElement &&
      scrollContainerRef.current &&
      typeof window !== "undefined" &&
      window.innerWidth <= 768
    ) {
      setTimeout(() => {
        const container = scrollContainerRef.current!;
        const elOffsetLeft = targetElement.offsetLeft;
        const elWidth = targetElement.offsetWidth;
        const containerWidth = container.offsetWidth;

        // نحاول نوسّط العنصر جوه الـ container
        const scrollPos = elOffsetLeft - containerWidth / 2 + elWidth / 2;

        container.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }, 300);
    }
  }, [userTargetAchievement, prizesData?.targetPoints, getUserLevelIndex]);

  return (
    <div>
      {/* الصورة الأولى */}
      {prizesData?.target_logo && (
        <div className="relative w-[85%] h-[45vmin] mx-auto">
          <Image
            alt="property image"
            src={prizesData.target_logo}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      )}

      {/* الشريط القابل للسكرول */}
      <div
        className={cn(
          `flex flex-row items-center gap-2 overflow-x-auto overflow-y-hidden scroll-smooth py-5 whitespace-nowrap`,
          isMobile ? "justify-start px-5" : "justify-center"
        )}
        ref={scrollContainerRef}
      >
        {prizesData?.targetPoints.map((item, index) => (
          <React.Fragment key={index}>
            <div
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="inline-flex flex-col items-center shrink-0 "
            >
              <ContestsStep
                isChecked={
                  index <=
                  getUserLevelIndex(
                    prizesData?.targetPoints,
                    userTargetAchievement
                  )
                }
                targetPointsItem={item}
                index={index}
                targetPoints={prizesData?.targetPoints}
              />
            </div>

            {index !== prizesData?.targetPoints.length - 1 && (
              <div className="w-[15vmin] h-[1.5vmin] bg-primary rounded-[4px] mt-[3vmin] inline-block shrink-0"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* الصورة الأخيرة */}

      {prizesData?.target_info && (
        <div className="relative w-[85%] h-[45vmin] mx-auto">
          <Image
            alt="property image"
            src={prizesData.target_info}
            fill
            className="object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default Contests;
