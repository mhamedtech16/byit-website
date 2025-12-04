"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useMobile } from "@/hooks/useMobile";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";

import LanguageDropdown from "./LanguageDropdown";

type Props = {
  defaultValue: string;
};

export default function LocaleSwitcherSelect({ defaultValue }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMobile();
  const searchParams = useSearchParams();
  const [selectedLocale, setSelectedLocale] = useState(defaultValue);

  const localeOptions = routing.locales.map((locale) => {
    const countryCode = locale === "ar" ? "EG" : "US"; // add more if needed
    return {
      id: countryCode,
      name: locale.toUpperCase(),
    };
  });

  function handleLocaleChange(value: string) {
    const newLocale = value.toLowerCase();
    setSelectedLocale(newLocale);

    // احتفظ بالـ query
    const query: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      query[key] = val;
    });

    router.replace(
      // @ts-expect-error - routing types are safe
      { pathname, params, query },
      { locale: newLocale as Locale }
    );
  }

  useEffect(() => {
    setSelectedLocale(defaultValue);
  }, [defaultValue]);

  return (
    <LanguageDropdown
      options={localeOptions}
      value={selectedLocale.toUpperCase()}
      onChange={handleLocaleChange}
      width={isMobile ? "w-[100px]" : ""}
    />
  );
}
