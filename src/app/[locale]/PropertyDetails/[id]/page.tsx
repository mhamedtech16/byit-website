import { isLocale } from "@/lib/isLocale";

import PropertyDetails from "../components/PropertyDetails";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";

  const titles: Record<string, string> = {
    ar: "تفاصيل الخصائص",
    en: "Properties Details",
  };

  return {
    title: titles[locales] || "Properties Details",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

export default async function Page() {
  return (
    <div>
      <PropertyDetails />
    </div>
  );
}
