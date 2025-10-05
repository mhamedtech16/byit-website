import React from "react";

import { isLocale } from "@/lib/isLocale";

import GuideLinesList from "./components/GuideLinesList";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";

  const titles: Record<string, string> = {
    ar: "فيديوهات شرح التطبيق",
    en: "Guidelines Videos",
  };

  return {
    title: titles[locales] || "Guidelines Videos",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

export default function Page() {
  return <GuideLinesList />;
}
