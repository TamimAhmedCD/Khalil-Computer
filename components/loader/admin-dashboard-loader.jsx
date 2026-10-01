import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminDashboardLoader() {
    return (
        <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 p-6">
                    {/* Decorative elements */}
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white opacity-10"></div>
                    <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white opacity-10"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4">
                            {/* Skeleton for Avatar */}
                            <Skeleton className="h-12 w-12 rounded-full bg-white/20" />

                            <div className="space-y-2">
                                {/* Skeleton for Heading Text */}
                                <Skeleton className="h-6 w-[200px] bg-white/20" />
                                {/* Skeleton for Subheading Text */}
                                <Skeleton className="h-4 w-[280px] bg-white/20" />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {/* Skeleton for Buttons */}
                            <Skeleton className="h-10 w-[150px] rounded-md bg-white/20" />
                            <Skeleton className="h-10 w-[200px] rounded-md bg-white/20" />
                        </div>
                    </div>

                    {/* Right-side Date and Time */}
                    <div className="absolute right-6 bottom-6">
                        <Skeleton className="h-4 w-32 bg-white/20" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default AdminDashboardLoader;
