import { isLocale } from "@/lib/isLocale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";
  const titles: Record<string, string> = {
    ar: "عن الشركة",
    en: "About Us",
  };

  return {
    title: titles[locales] || "About Us",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
