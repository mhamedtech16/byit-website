import { Skeleton } from "@/shadcn/components/ui/skeleton";

export function SkeletonLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-4xl p-4">
        <Skeleton className="h-[50vmin] w-full rounded-xl bg-primary/80" />

        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-44 bg-primary/80" />
          <Skeleton className="h-4 w-24 bg-primary/80" />
        </div>
        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-44 bg-primary/80" />
          <Skeleton className="h-4 w-24 bg-primary/80" />
        </div>
        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-44 bg-primary/80" />
          <Skeleton className="h-4 w-24 bg-primary/80" />
        </div>
        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-44 bg-primary/80" />
        </div>
        <div className="flex justify-between w-full">
          <Skeleton className="h-4 w-44 bg-primary/80" />
        </div>
      </div>
    </div>
  );
}
