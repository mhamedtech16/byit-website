"use client";

import { dir } from "i18next";
import { useLocale } from "next-intl";
import React, { useState } from "react";

import { pricePerLangauge } from "@/lib/PriceArray";

const formatWithCommas = (value: string) => {
  if (!value) return "";
  return pricePerLangauge(parseFloat(value), "en");
  // return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseNumber = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

type Props = {
  title: string;
  onChange: (val: string) => void;
};

const FormattedNumberInput = ({ title, onChange }: Props) => {
  const [rawValue, setRawValue] = useState("");
  const locale = useLocale();

  // تحديد اللغة بناءً على النص أو المتصفح
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const onlyNumbers = parseNumber(input);

    setRawValue(onlyNumbers);
    onChange(onlyNumbers);
  };

  const formattedValue = formatWithCommas(rawValue);
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
      />
    </div>
  );
};

export default FormattedNumberInput;
