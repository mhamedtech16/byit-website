import { isLocale } from "@/lib/isLocale";

import UpdateAccount from "./components/UpdateAccount";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";
  const titles: Record<string, string> = {
    ar: "تحديث الحساب",
    en: "Update Account",
  };

  return {
    title: titles[locales] || "Update Account",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

export default function page() {
  return (
    <div className="items-center justify-center flex ">
      <UpdateAccount />
    </div>
  );
}
