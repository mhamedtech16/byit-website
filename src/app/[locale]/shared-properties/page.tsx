import React from "react";

import { isLocale } from "@/lib/isLocale";

import SharedPropertiesList from "./components/SharedPropertyList";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";

  const titles: Record<string, string> = {
    ar: "العقارات الجزئية",
    en: "Shared Properties Page",
  };

  return {
    title: titles[locales] || "Shared Properties Page",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

function page() {
  return (
    <div>
      <SharedPropertiesList />
    </div>
  );
}

export default page;
