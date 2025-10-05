import ClosingForm from "@/components/ClosingForm";
import { isLocale } from "@/lib/isLocale";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const locales = isLocale(locale) ? locale : "en";

  const titles: Record<string, string> = {
    ar: "نموذج الإغلاق",
    en: "Closing Form Page",
  };

  return {
    title: titles[locales] || "Closing Form Page",
    // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
  };
}

export default function CloseFormPage() {
  return (
    <div className=" items-center justify-center min-h-screen bg-primary ">
      <ClosingForm />
    </div>
  );
}
