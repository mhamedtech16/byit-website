import React from "react";

import { isLocale } from "@/lib/isLocale";

import SharesDealsForm from "./components/SharesDealsForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";

  const titles: Record<string, string> = {
    ar: "نموذج صفقات الأسهم",
    en: "Shares Deal Page",
  };

  return {
    title: titles[locales] || "Shares Deal Page",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

function page() {
  return (
    <div className=" items-center justify-center min-h-screen bg-primary ">
      <SharesDealsForm />
    </div>
  );
}

export default page;
