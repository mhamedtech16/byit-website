import ChangePassword from "@/components/ChangePassword";
import { isLocale } from "@/lib/isLocale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";
  const titles: Record<string, string> = {
    ar: "تغيير كلمة المرور",
    en: "Change password",
  };

  return {
    title: titles[locales] || "Change password",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

export default function page() {
  return (
    <div>
      <ChangePassword />
    </div>
  );
}
