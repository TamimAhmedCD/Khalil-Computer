import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
    return (
        <Card className="m-6 md:m-8">
            {/* Header Skeleton */}
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-[200px]" />
                        <Skeleton className="h-4 w-[350px]" />
                    </div>
                    <Skeleton className="h-10 w-[160px] rounded-md" />
                </div>
            </CardHeader>

            {/* Controls Skeleton */}
            <CardContent className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <Skeleton className="flex-1 h-10" />
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </CardContent>

            {/* Table Skeleton */}
            <div className="px-6 pb-6">
                <div className="border rounded-md">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 grid grid-cols-5 gap-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>

                    {/* Rows */}
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="p-4 grid grid-cols-5 gap-4 border-t">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default LoadingSkeleton;