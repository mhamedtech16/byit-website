"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { routes } from "@/_lib/routes";
import { CampaignDetailsCard } from "@/components/CampaignDetailsCard";
import { SkeletonLoading } from "@/components/SkeletonComponent";
import { useCampaignStore } from "@/context/CampaignContext";
import { useIsRTL } from "@/hooks/useRTL";

export default function LeadGenration() {
  const { campaigns, activeCampaign, loading } = useCampaignStore();
  const router = useRouter();
  const isRTL = useIsRTL();

  const selectedCampaign = campaigns.find((c) => c.id === activeCampaign);

  useEffect(() => {
    return () => {
      localStorage.removeItem("activeCampaign");
    };
  }, []);

  if (!selectedCampaign)
    return <p className="text-center">No Campaigns Found</p>;

  if (loading) return <SkeletonLoading />;

  return (
    <CampaignDetailsCard
      onReadMore={() =>
        router.push(
          routes.PropertyDetails.Details(selectedCampaign.project?.id)
        )
      }
      img={selectedCampaign.img}
      name={isRTL ? selectedCampaign.name_ar : selectedCampaign.name_en}
      description={
        isRTL
          ? selectedCampaign.description_ar
          : selectedCampaign.description_en
      }
      whatsappNumber={selectedCampaign.whatsappNumber}
      isRTL={isRTL}
      isJoined={selectedCampaign.isJoined}
      onShowLeads={() =>
        router.push(routes.LeadGenration.MyLeads(selectedCampaign.id))
      }
    />
  );
}
