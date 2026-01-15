import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

import { pricePerLangauge } from "@/lib/PriceArray";
import { Prize, TargetPoint } from "@/types/Contests";

type Props = {
  targetPointsItem: TargetPoint;
  targetPoints: TargetPoint[];
  isChecked: boolean;
  index: number;
};
export const ContestsStep = ({
  targetPointsItem,
  isChecked,
  targetPoints,
  index,
}: Props) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-[5vmin] h-[5vmin] mx-auto">
        <Image
          alt="property image"
          src={targetPointsItem.prize.img}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <p className="text-[2vmin] h-[3vmin]">
        {targetPointsItem.prize.ar_title}
      </p>
      <div className="flex flex-row justify-center items-center">
        <div className="flex w-[4vmin] h-[4vmin] rounded-[2vmin] border-primary border-2 justify-center items-center">
          {isChecked && (
            <i className="fa-solid fa-check text-[3vmin] text-orangeApp"></i>
          )}
        </div>
      </div>
      <p className="text-[2vmin] text-center h-[5vmin] mt-1">
        {pricePerLangauge(targetPointsItem.point, locale)}
        {targetPoints.length - 1 == index ? "+" : ""}
        <br /> {t("Million")}
      </p>
    </div>
  );
};
