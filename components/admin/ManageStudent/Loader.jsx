import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LoadingSkeleton = () => {
    return (
        <Card className="m-6 md:m-8">
            <CardContent className="space-y-6 py-8">
                {/* Loading Animation for Students Grid */}
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">Loading students...</p>
                </div>

                {/* Skeleton Cards (hidden by default, shown only when needed) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 opacity-0 pointer-events-none" aria-hidden="true">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="border rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="h-3 w-full bg-gray-200 rounded"></div>
                                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export const StudentCardSkeleton = () => {
    return (
        <div className="border rounded-xl p-4 space-y-3 opacity-50">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="space-y-2 flex-1">
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="space-y-1">
                <div className="h-3 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;