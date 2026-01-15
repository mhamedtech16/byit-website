"use client";

import i18next from "i18next";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { pricePerLangauge } from "@/lib/PriceArray";
import { Label } from "@/shadcn/components/ui/label";
import { SharedProperties } from "@/types/Properties";
import { ShareUnit } from "@/types/ShareUnit";

import { SharedDropdownInput } from "./SharedCountDropdown";
import SharedFormattedNumberInput from "./ui/SharedCurrencyInput";

type Props = {
  item: ShareUnit;
};
const SharedPropertyCalculator = ({ item }: Props) => {
  const t = useTranslations();
  const [grossCommission, setGrossCommission] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [netCommission, setNetCommission] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [selectedShare, setSelectedShare] = useState<number>(1);
  const [sharePrices, setSharePrices] = useState<number>(0);

  const availableShares = Array.from(
    { length: item.available_shares || 50 },
    (_, i) => i + 1
  );

  useEffect(() => {
    const totalPrice = (item?.share_price ?? 0) * selectedShare;

    const grossComm = totalPrice * ((item?.actual_commission ?? 0) / 100);

    const txs = grossComm * (36 / 100);
    const netComm = grossComm - txs;

    const currentEarning = netComm * ((item?.on_spot_commission ?? 0) / 100);

    setGrossCommission(grossComm);
    setTaxes(txs);
    setNetCommission(netComm);
    setEarnings(currentEarning);
    setSharePrices(totalPrice);
  }, [selectedShare, item]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Label className="text-[var(--primary)] text-bold text-lg text-center">
        {t("Calculate your Earnings")}
      </Label>

      <div className="flex flex-row  gap-4 mt-[2vmin] items-center">
        <div className="">
          <Label className="mb-2">{t("sharesCount")}</Label>
          <SharedDropdownInput
            title="Shares Count"
            data={availableShares}
            value={selectedShare}
            onChange={(val) => setSelectedShare(val)}
          />
        </div>

        <div>
          <Label className="mb-2">{t("sharesPrice")}</Label>
          <SharedFormattedNumberInput
            title={t("ClosingForm.dealValue")}
            value={sharePrices.toString()}
            onChange={(val) => {
              const parsedVal = typeof val === "string" ? parseFloat(val) : val;
              setSharePrices(parsedVal);
            }}
          />
        </div>
      </div>

      <Label className="text-center text-lg] font-bold mt-[1vmin] text-[var(--app-gray)]">
        <Label className="text-lg font-bold text-black">
          {t("Commission Percentage")}:
        </Label>
        {pricePerLangauge(item?.actual_commission, i18next.language)}%
      </Label>

      <Label className="text-center text-lg font-bold mt-[1vmin] text-[var(--app-gray)]">
        <Label className="text-lg font-bold text-black">
          {t("Gross Commission")}:
        </Label>
        {pricePerLangauge(grossCommission, i18next.language)} {t("LE")}
      </Label>

      <Label className="text-center text-lg font-bold mt-[1vmin] text-[var(--app-gray)]">
        <Label className="text-lg font-bold text-black">{t("TxAf")}:</Label>
        {pricePerLangauge(taxes, i18next.language)} {t("LE")}
      </Label>

      <Label className="text-center text-lg font-bold mt-[1vmin] text-[var(--app-gray)]">
        <Label
          style={{ color: "black" }}
          className="text-lg font-bold text-black"
        >
          {t("Net Commission")}:
        </Label>
        {pricePerLangauge(netCommission, i18next.language)} {t("LE")}
      </Label>

      <Label className="text-center text-lg font-bold mt-[1vmin] text-[var(--app-gray)]">
        <Label className="text-lg font-bold text-black">
          {t("Your Earnings")} :
        </Label>
        {pricePerLangauge(earnings, i18next.language)} {t("LE")}
        <Label className="text-center text-[var(--orangeApp)] text-lg font-bold">
          ({pricePerLangauge(item?.on_spot_commission, i18next.language)}
          %)
        </Label>
      </Label>
    </div>
  );
};

export default SharedPropertyCalculator;
