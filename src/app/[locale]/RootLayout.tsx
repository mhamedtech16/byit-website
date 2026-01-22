"use client";

import OfflinePage from "@/components/OfflinePage";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function OnlineGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOnline = useOnlineStatus();

  // Offline
  if (!isOnline) {
    return <OfflinePage />;
  }

  return <>{children}</>;
}
