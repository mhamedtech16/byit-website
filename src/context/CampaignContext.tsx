"use client";

import { createContext, useContext, useState, useEffect } from "react";

import useCampaigns from "@/hooks/useCampagin";
import { useAuthStore } from "@/store/authStore";
import { Campaign } from "@/types/Campaigns";

interface CampaignContextProps {
  campaigns: Campaign[];
  activeCampaign: number | null;
  loading: boolean;
  setActiveCampaign: (id: number) => void;
  isViewingLeads: boolean;
  setIsViewingLeads: (value: boolean) => void;
}

const CampaignContext = createContext<CampaignContextProps>({
  campaigns: [],
  activeCampaign: null,
  loading: false,
  setActiveCampaign: () => {},
  isViewingLeads: false,
  setIsViewingLeads: () => {},
});

export const CampaignProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser } = useAuthStore();
  const { campaigns, loading } = useCampaigns(currentUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const campaignsData = campaigns || [];

  const [activeCampaign, setActiveCampaign] = useState<number | null>(null);
  const [isViewingLeads, setIsViewingLeads] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("activeCampaign");

    if (saved) {
      setActiveCampaign(Number(saved));
    } else if (campaignsData.length > 0) {
      const lastCampaign = campaignsData.length;
      setActiveCampaign(lastCampaign);
      localStorage.setItem("activeCampaign", String(lastCampaign));
    }
  }, [campaignsData]);

  const handleSetActiveCampaign = (id: number) => {
    if (isViewingLeads && activeCampaign !== id) {
      const confirmChange = window.confirm();
      if (!confirmChange) return;
    }

    setActiveCampaign(id);
    localStorage.setItem("activeCampaign", String(id)); // save to localStorage
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns: campaignsData,
        activeCampaign,
        loading,
        setActiveCampaign: handleSetActiveCampaign,
        isViewingLeads,
        setIsViewingLeads,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignStore = () => useContext(CampaignContext);
