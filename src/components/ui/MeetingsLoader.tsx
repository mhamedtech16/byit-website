"use client";

import { Card } from "@/shadcn/components/ui/card";
import { Separator } from "@/shadcn/components/ui/separator";

export default function MeetingsLoader() {
  return (
    <Card className="rounded-xl border shadow-sm bg-white p-6">
      {/* Title skeleton */}
      <div className="h-6 w-48 mx-auto bg-gray-300 animate-pulse rounded mb-4" />

      <Separator className="my-4" />

      {/* Summary skeleton */}
      <div className="space-y-3">
        <div className="p-3 bg-gray-200 animate-pulse rounded-lg h-20" />
        <div className="flex gap-3">
          <div className="flex-1 h-16 bg-gray-200 animate-pulse rounded-lg" />
          <div className="flex-1 h-16 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>

      <Separator className="my-4" />

      {/* Meetings grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    </Card>
  );
}
