import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";

const LoadingSkeleton = () => {
    return (
        <Card className="m-6 md:m-8">
            {/* Header Skeleton */}
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-[180px]" />
                        <Skeleton className="h-4 w-[280px]" />
                    </div>
                    <Skeleton className="h-10 w-[160px] rounded-md" />
                </div>
            </CardHeader>

            {/* Controls Skeleton */}
            <CardContent className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search skeleton */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>

                    {/* Filters skeleton */}
                    <div className="flex gap-2">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Skeleton className="h-10 w-48 rounded-md" />
                        </div>
                        <Skeleton className="h-10 w-36 rounded-md" />
                        <Skeleton className="h-10 w-28 rounded-md" />
                    </div>
                </div>

                {/* Total count skeleton */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>

                {/* Students Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <Card key={index} className="border shadow-sm animate-pulse">
                            <CardHeader className="pb-4">
                                <div className="flex items-start space-x-3">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-5 w-[70%]" />
                                        <Skeleton className="h-4 w-[60%]" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Skeleton className="h-4 w-4 rounded mr-2" />
                                        <Skeleton className="h-4 w-[80%]" />
                                    </div>
                                    <div className="flex items-center">
                                        <Skeleton className="h-4 w-4 rounded mr-2" />
                                        <Skeleton className="h-4 w-[70%]" />
                                    </div>
                                    <div className="flex items-start">
                                        <Skeleton className="h-4 w-4 rounded mr-2 mt-0.5" />
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-[60%]" />
                                        <Skeleton className="h-3 w-[50%]" />
                                        <Skeleton className="h-3 w-[70%]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination skeleton */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <Skeleton className="h-4 w-[120px]" />
                    <div className="flex items-center gap-2">
                        {[...Array(7)].map((_, index) => (
                            <Skeleton key={index} className="h-9 w-9 rounded-md" />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const StudentCardSkeleton = () => {
    return (
        <Card className="border shadow-sm animate-pulse">
            <CardHeader className="pb-4">
                <div className="flex items-start space-x-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-[70%]" />
                        <Skeleton className="h-4 w-[60%]" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded mr-2" />
                        <Skeleton className="h-4 w-[80%]" />
                    </div>
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded mr-2" />
                        <Skeleton className="h-4 w-[70%]" />
                    </div>
                    <div className="flex items-start">
                        <Skeleton className="h-4 w-4 rounded mr-2 mt-0.5" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="space-y-1">
                        <Skeleton className="h-3 w-[60%]" />
                        <Skeleton className="h-3 w-[50%]" />
                        <Skeleton className="h-3 w-[70%]" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoadingSkeleton;