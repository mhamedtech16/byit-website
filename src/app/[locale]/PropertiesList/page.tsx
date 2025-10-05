import PropertiesList from "./components/PropertyList";

type Props = {
  params: Promise<{ locale: "ar" | "en" }>;
  searchParams: Promise<{ propertyType?: "COMPOUND" | "SEPARATED" }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
  const { locale } = await params;
  const propertyType = (await searchParams).propertyType;

  const titles: Record<
    "ar" | "en",
    { default: string; SEPARATED: string; COMPOUND: string }
  > = {
    ar: {
      default: "الصفحة الرئيسية",
      SEPARATED: "البحث في العقارات المنفصلة",
      COMPOUND: "البحث في المجمعات",
    },
    en: {
      default: "Home Page",
      SEPARATED: "Search in Separated Properties",
      COMPOUND: "Search in Compounds",
    },
  };

  const title =
    (propertyType && titles[locale][propertyType]) || titles[locale].default;

  return {
    title,
    // description: `Dynamic metadata (${locale}) - ${propertyType || "default"}`,
  };
}

export default async function Page() {
  return (
    <div>
      <PropertiesList />
    </div>
  );
}
