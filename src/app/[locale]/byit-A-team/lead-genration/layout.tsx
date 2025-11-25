"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import { routes } from "@/_lib/routes";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { Sidebar } from "@/components/ui/Sidebar";
import { useCampaignStore } from "@/context/CampaignContext";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";

export default function LeadGenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="flex w-full p-16 min-h-screen bg-slate-50">
      <Sidebar>
        {campaigns.map((c) => (
          <motion.div variants={linkVariants} key={c.id}>
            <Button
              onClick={() => handleClick(c.id)}
              variant="linkUnderline"
              size="linkUnderline"
              className={
                activeCampaign === c.id
                  ? "text-primary font-semibold underline"
                  : ""
              }
            >
              {isRTL ? c.name_ar : c.name_en}
            </Button>
          </motion.div>
        ))}
      </Sidebar>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
