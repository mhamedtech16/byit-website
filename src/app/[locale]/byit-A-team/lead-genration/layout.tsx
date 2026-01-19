"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import { routes } from "@/_lib/routes";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { Sidebar } from "@/components/ui/Sidebar";
import { useCampaignStore } from "@/context/CampaignContext";
import { useMobile } from "@/hooks/useMobile";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { ScrollBar } from "@/shadcn/components/ui/scroll-area";
import { cn } from "@/shadcn/lib/utils";

// type Props = {
//   params: Promise<{ locale: string }>;
// };

// export async function generateMetadata({ params }: Props) {
//   const { locale } = await params;
//   const locales = isLocale(locale) ? locale : "en";

//   const titles: Record<string, string> = {
//     ar: "Byit A team | Lead generation",
//     en: "Byit A team | Lead generation",
//   };

//   return {
//     title: titles[locales] || "Byit A team | Lead generation",
//     // description: "دي صفحة الـ Closing Form الخاصة بالموقع",
//   };
// }

export default function LeadGenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMobile();
  const pathname = usePathname();
  const router = useRouter();

  const { campaigns, activeCampaign, setActiveCampaign, loading } =
    useCampaignStore();
  const isRTL = useIsRTL();

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const handleClick = (id: number) => {
    if (pathname === routes.LeadGenration.Root) {
      setActiveCampaign(id);
    } else if (pathname.includes("/my-leads")) {
      setActiveCampaign(id);
      router.push(routes.LeadGenration.MyLeads(id));
    }
  };

  if (loading) return <SkeletonLoading />;

  return (
    <div
      className={cn(
        "flex w-full ",
        isMobile ? "flex-col" : "p-16 min-h-screen"
      )}
    >
      {isMobile ? (
        <ScrollArea
          className="rounded-md whitespace-nowrap"
          dir={isRTL ? "rtl" : "ltr"}
          autoFocus
        >
          <div
            className="flex w-max space-x-4 p-4 overflow-x-auto" // مهم: overflow-x-auto هنا
            // ref={scrollContainerRef} // هذا هو العنصر اللي هنعمل له scroll
          >
            {campaigns.map((c) => (
              <motion.div variants={linkVariants} key={c.id}>
                <Button
                  onClick={() => handleClick(c.id)}
                  variant="linkUnderline"
                  size="linkUnderline"
                  className={
                    activeCampaign === c.id
                      ? "text-orangeApp font-semibold underline text-xl"
                      : ""
                  }
                >
                  {isRTL ? c.name_ar : c.name_en}
                </Button>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      ) : (
        <Sidebar>
          {campaigns.map((c) => (
            <motion.div variants={linkVariants} key={c.id}>
              <Button
                onClick={() => handleClick(c.id)}
                variant="linkUnderline"
                size="linkUnderline"
                className={
                  activeCampaign === c.id
                    ? "text-orangeApp font-semibold underline"
                    : ""
                }
              >
                {isRTL ? c.name_ar : c.name_en}
              </Button>
            </motion.div>
          ))}
        </Sidebar>
      )}

      <div className={cn(isMobile ? "p-2" : "flex-1 p-10")}>{children}</div>
    </div>
  );
}
