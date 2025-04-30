import { Skeleton } from "../ui/skeleton";

export function AdminDashboardLoader() {
    return (

        <Skeleton className="relative p-6 bg-gray-50">
            {/* Decorative elements */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white opacity-10"></div>
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white opacity-10"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-4">
                    {/* Skeleton for Avatar */}
                    <Skeleton className="h-12 w-12 rounded-full" />

                    <div>
                        {/* Skeleton for Heading Text */}
                        <Skeleton className="h-4 w-[200px]" />
                        {/* Skeleton for Subheading Text */}
                        <Skeleton className="h-3 w-[150px] mt-5" />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    {/* Skeleton for Buttons */}
                    <Skeleton className="h-10 w-[150px] rounded-md" />
                    <Skeleton className="h-10 w-[200px] rounded-md" />
                </div>
            </div>

            {/* Right-side Date and Time */}
            <div className="absolute right-6 bottom-6 text-sm text-primary-100">
                <Skeleton className="h-3 w-24" />
            </div>
        </Skeleton>


    );
}

export default AdminDashboardLoader;
