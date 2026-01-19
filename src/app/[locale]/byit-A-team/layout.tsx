"use client";

import { CampaignProvider } from "@/context/CampaignContext";

export default function LeadGenRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CampaignProvider>{children}</CampaignProvider>;
}
