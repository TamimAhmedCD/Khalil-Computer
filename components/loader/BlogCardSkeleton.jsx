import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 p-0"
        >
          {/* Cover Image Skeleton */}
          <Skeleton className="h-48 w-full bg-gray-100" />

          {/* Content Skeleton */}
          <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-gray-100" />
              <Skeleton className="h-6 w-full bg-gray-100" />
              <Skeleton className="h-6 w-3/4 bg-gray-100" />
              <Skeleton className="h-4 w-full bg-gray-100 mt-2" />
              <Skeleton className="h-4 w-2/3 bg-gray-100" />
            </div>

            {/* Meta Skeleton */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <Skeleton className="h-3 w-24 bg-gray-100" />
              <Skeleton className="h-3 w-16 bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeaturedBlogSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 lg:h-80 w-full rounded-xl bg-gray-100" />
        <div className="flex flex-col justify-between space-y-4 py-2">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24 bg-gray-100" />
            <Skeleton className="h-8 w-full bg-gray-100" />
            <Skeleton className="h-8 w-3/4 bg-gray-100" />
            <Skeleton className="h-4 w-full bg-gray-100 mt-4" />
            <Skeleton className="h-4 w-full bg-gray-100" />
            <Skeleton className="h-4 w-2/3 bg-gray-100" />
          </div>
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Skeleton className="h-4 w-32 bg-gray-100" />
            <Skeleton className="h-4 w-24 bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
