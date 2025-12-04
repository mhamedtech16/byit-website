"use client";

import { motion } from "framer-motion";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { pricePerLangauge } from "@/lib/PriceArray";
import { Label } from "@/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import { cn } from "@/shadcn/lib/utils";
import { NewLaunch, Property } from "@/types/Properties";

import FormattedNumberInput from "./ui/CurrencyInput";

type Vendor = {
  name: string;
  logo?: string;
  ratio?: number;
  onspotRatio?: number;
  netRatio?: number;
};

type Props = {
  item: Property | NewLaunch;
  type?: "property" | "newLaunch";
  setCalcOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PropertyCalculator = ({
  item,
  type = "property",
  setCalcOpen,
}: Props) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = useIsRTL();
  const isMobile = useMobile();

  const [calcType, setCalcType] = useState<"OnspotCalc" | "NormalCalc">(
    "NormalCalc"
  );
  const [earnings, setEarnings] = useState(0);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [dealValue, setDealValue] = useState<number>(0);

  // اختار vendors حسب النوع
  const vendors: Vendor[] | undefined =
    type === "property"
      ? (item as Property)?.project.vendors
      : (item as NewLaunch)?.vendors;

  // اختر أفضل vendor تلقائياً لو موجودين
  useEffect(() => {
    if (vendors?.length) {
      const bestVendor = vendors.reduce((prev, curr) => {
        const prevRatio =
          calcType === "OnspotCalc" ? prev.onspotRatio ?? 0 : prev.ratio ?? 0;
        const currRatio =
          calcType === "OnspotCalc" ? curr.onspotRatio ?? 0 : curr.ratio ?? 0;
        return currRatio > prevRatio ? curr : prev;
      });
      setSelectedVendorId(bestVendor.name);
    } else {
      setSelectedVendorId(null);
    }
  }, [vendors, calcType]);

  const selectedVendor = vendors?.find((v) => v.name === selectedVendorId);

  // احسب الأرباح
  useEffect(() => {
    if (!selectedVendor || !dealValue) {
      setEarnings(0);
      return;
    }

    const ratio =
      calcType === "OnspotCalc"
        ? selectedVendor.onspotRatio ?? 0
        : selectedVendor.ratio ?? 0;
    const netRatio =
      calcType === "OnspotCalc" ? 80 : selectedVendor.netRatio ?? 0;

    const grossComm = dealValue * (ratio / 100);
    const txs = grossComm * 0.36;
    const netComm = grossComm - txs;

    setEarnings(netComm * (netRatio / 100));
  }, [dealValue, calcType, selectedVendor]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Label className="text-[var(--primary)] text-bold text-lg text-center mb-3">
        {t("Calculate your Earnings")}
      </Label>

      {calcType === "OnspotCalc" && (
        <Label className="text-[var(--orangeApp)] text-sm sm:text-base font-medium mt-3">
          {t("Get paid a week after closing")}
        </Label>
      )}

      <Tabs
        value={calcType}
        onValueChange={(val) => setCalcType(val as "OnspotCalc" | "NormalCalc")}
        className="w-full flex flex-col items-center"
      >
        <TabsList className="grid w-full h-[50px] max-w-[320px] grid-cols-2 rounded-xl overflow-hidden shadow-md mt-3">
          {isRTL ? (
            <>
              <TabsTrigger
                value="OnspotCalc"
                className="data-[state=active]:bg-[var(--orangeApp)] data-[state=active]:text-white text-[var(--orangeApp)] font-semibold text-sm sm:text-base py-3 transition"
              >
                {t("onSpot")}
              </TabsTrigger>
              <TabsTrigger
                value="NormalCalc"
                className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white text-[var(--primary)] font-semibold text-sm sm:text-base py-3 transition"
              >
                {t("standerd")}
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger
                value="NormalCalc"
                className="data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white text-[var(--primary)] font-semibold text-sm sm:text-base py-3 transition"
              >
                {t("standerd")}
              </TabsTrigger>
              <TabsTrigger
                value="OnspotCalc"
                className="data-[state=active]:bg-[var(--orangeApp)] data-[state=active]:text-white text-[var(--orangeApp)] font-semibold text-sm sm:text-base py-3 transition"
              >
                {t("onSpot")}
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent
          value={calcType}
          className="flex flex-col items-center justify-center gap-4 mt-6 w-full"
        >
          <div className={cn("w-90 space-y-4", isMobile ? "px-4" : "px-0")}>
            <p className={cn("mb-2 font-medium ", isRTL ? "text-right" : "")}>
              {t("ClosingForm.dealValue")}
            </p>
            <FormattedNumberInput
              title={t("ClosingForm.dealValue")}
              onChange={(val) => setDealValue(isNaN(+val) ? 0 : +val)}
            />

            {vendors?.length ? (
              <>
                <p
                  className={cn("mb-2 font-medium ", isRTL ? "text-right" : "")}
                >
                  {t("partner")}
                </p>
                <Select
                  onValueChange={(val) => setSelectedVendorId(val)}
                  value={selectedVendorId ?? ""}
                >
                  <SelectTrigger
                    size="lg"
                    className={cn(
                      "w-full",
                      isRTL ? "flex flex-row-reverse" : ""
                    )}
                    icon={
                      isRTL ? (
                        <ArrowBigLeftIcon className="size-5 bg-orangeApp rounded-full text-white" />
                      ) : (
                        <ArrowBigRightIcon className="size-5 bg-orangeApp rounded-full text-white" />
                      )
                    }
                  >
                    {[0, 0.4, 0.6].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          x: isRTL ? [0, 30, 0] : [30, 0, 30], // add a return phase
                          opacity: [1, 0, 1], // fade in/out smoothly
                        }}
                        transition={{
                          duration: 2.5, // a bit longer for smoothness
                          repeat: Infinity,
                          ease: "easeInOut", // smoother easing
                          delay,
                        }}
                        className={cn(
                          !isMobile &&
                            (isRTL ? "absolute left-28" : "absolute right-35"),
                          isMobile &&
                            (isRTL ? "absolute left-13" : "absolute right-20")
                        )}
                      >
                        <i
                          className={cn(
                            "fa-play fa-solid h-3.5 w-4 text-primary",
                            isRTL && "rotate-180"
                          )}
                        />
                      </motion.div>
                    ))}
                    <SelectValue placeholder={t("selectVendor")} />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.name} value={vendor.name}>
                        {vendor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            ) : null}
          </div>

          <div
            className={cn(
              "flex items-center justify-center gap-2 text-base font-bold mt-2 text-[var(--app-gray)]",
              isRTL ? "flex-row-reverse" : "flex-row"
            )}
          >
            <span className="text-black">
              {isRTL ? `:${t("Your Earnings")}` : `${t("Your Earnings")} :`}
            </span>
            <span>
              {pricePerLangauge(earnings, locale)} {t("LE")}
            </span>
            {calcType === "NormalCalc" && selectedVendor && (
              <span className="text-[var(--orangeApp)]">
                ({pricePerLangauge(selectedVendor.netRatio ?? 0, locale)}%)
              </span>
            )}
          </div>

          <Label className="text-center text-sm font-medium text-[var(--app-gray)]">
            {t("Plus any incentives from the developer")}
          </Label>

          {calcType === "OnspotCalc" && (
            <Label className="text-[var(--orangeApp)] mt-3 text-center text-sm">
              {t(
                "Disclaimer On-spot requests need a 10%+ down payment Contact support for exceptions"
              )}
            </Label>
          )}
        </TabsContent>
      </Tabs>

      <button
        className="bg-orangeApp flex items-center justify-center px-16 mt-6 py-2 rounded-full cursor-pointer"
        onClick={() => setCalcOpen(false)}
      >
        <p className="text-2xl font-medium text-white">{t("ok")}</p>
      </button>
    </div>
  );
};

export default PropertyCalculator;
