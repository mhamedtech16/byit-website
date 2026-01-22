"use client";

import { WifiOff } from "lucide-react";

import { Button } from "@/shadcn/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <WifiOff size={64} className="mb-4 text-gray-500" />
      <h1 className="text-2xl font-bold">You are offline</h1>
      <p className="text-gray-500 mt-2">
        Please check your internet connection and retry again
      </p>

      <div className="mt-4">
        <Button variant={"default"} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  );
}
