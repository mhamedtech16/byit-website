"use client";

import { useEffect, useState } from "react";

import { Skeleton } from "@/shadcn/components/ui/skeleton";

export default function HydrationGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Wait one tick to allow Zustand to hydrate from localStorage
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="p-8 space-y-4 w-full max-w-md mx-auto">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    );
  }

  return <>{children}</>;
}
