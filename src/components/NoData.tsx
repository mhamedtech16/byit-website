"use client";

import { useTranslations } from "next-intl";
import { JSX } from "react";

interface NoDataProps {
  message?: string;
  imageSrc?: JSX.Element;
}

export default function NoData({ message = "noData", imageSrc }: NoDataProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center h-[58vh] w-full text-center">
      <div className="relative h-[20vmin] w-[20vmin] mx-auto text-center mb-12">
        {imageSrc && imageSrc}
      </div>
      <h2 className="text-2xl text-center font-semibold text-white">
        {t(message)}
      </h2>
    </div>
  );
}
