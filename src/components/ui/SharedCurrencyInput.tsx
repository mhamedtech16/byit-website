"use client";

import { dir } from "i18next";
import { useLocale } from "next-intl";
import React from "react";

import { pricePerLangauge } from "@/lib/PriceArray";

const formatWithCommas = (value: string) => {
  if (!value) return "";
  return pricePerLangauge(parseFloat(value), "en");
};

const parseNumber = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

type Props = {
  title: string;
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
};

const SharedFormattedNumberInput = ({
  title,
  onChange,
  value,
  readOnly,
  disabled,
}: Props) => {
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const onlyNumbers = parseNumber(input);
    onChange(onlyNumbers); // ندي القيمة النقية للـ parent
  };

  const formattedValue = formatWithCommas(value);

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        inputMode="numeric"
        value={formattedValue}
        onChange={handleChange}
        dir={dir(locale)}
        placeholder={title}
        className="border p-2 w-full text-lg"
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default SharedFormattedNumberInput;
