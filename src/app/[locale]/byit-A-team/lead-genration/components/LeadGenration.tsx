"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { routes } from "@/_lib/routes";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { Sidebar } from "@/components/ui/Sidebar";
import useCampaigns from "@/hooks/useCampagin";
import { useIsRTL } from "@/hooks/useRTL";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent } from "@/shadcn/components/ui/card";

export default function LeadGenration() {
  const router = useRouter();
  const isRTL = useIsRTL();
  const { campaigns, loading } = useCampaigns();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const campaignsData = campaigns || [];

  const [activeCampaign, setActiveCampaign] = useState<number | null>(null);

  useEffect(() => {
    if (campaignsData.length > 0) {
      const lastCampaign = campaignsData.length;
      setActiveCampaign(lastCampaign);
    }
  }, [campaignsData]);

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };
  const selectedCampaign = campaignsData.find(
    (item) => item.id === activeCampaign
  );

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="flex min-h-screen w-full p-16 bg-slate-50 overflow-x-hidden">
      <Sidebar>
        {campaignsData.map((c) => (
          <motion.div variants={linkVariants} key={c.id}>
            <Button
              onClick={() => setActiveCampaign(c.id)}
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

      {selectedCampaign && (
        <div className="flex-1 p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-x-hidden">
              <div className="relative w-full h-[40vmin]">
                <Image
                  src={selectedCampaign.img}
                  alt={selectedCampaign.name}
                  fill
                  className="object-cover px-4 rounded-2xl"
                />
              </div>

              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold">
                  {isRTL ? selectedCampaign.name_ar : selectedCampaign.name_en}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {isRTL
                    ? selectedCampaign.description_ar
                    : selectedCampaign.description_en}
                </p>

                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => router.push(routes.PropertyDetails || "#")}
                  >
                    Read more details
                  </Button>

                  <Button
                    className="bg-primary text-white"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${selectedCampaign.whatsappNumber}`,
                        "_blank"
                      )
                    }
                  >
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
