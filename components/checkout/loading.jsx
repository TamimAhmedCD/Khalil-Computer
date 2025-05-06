import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";


export default function CheckoutLoading() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Skeleton className="h-6 w-32 mb-6" />
                <Skeleton className="h-10 w-64 mx-auto mb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content - Checkout form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex items-center gap-4 mb-4">
                                <Skeleton className="h-16 w-24 rounded-md" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                            <Separator className="my-4" />

                            {/* Form skeleton */}
                            <div className="space-y-6">
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-10 w-full mb-4" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-20" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-28" />
                                    <Skeleton className="h-24 w-full" />
                                </div>

                                <Skeleton className="h-6 w-40 mb-2" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-full" />
                                </div>

                                <Skeleton className="h-10 w-full mt-6" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Order summary */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-20" />
                                </div>

                                <div className="mt-6 space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <div className="space-y-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <Skeleton className="h-5 w-5 rounded-full" />
                                                <Skeleton className="h-4 w-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
