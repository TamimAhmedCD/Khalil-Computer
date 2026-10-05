import { Skeleton } from "../ui/skeleton";

export default function CourseCardSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3 p-4 border rounded-xl bg-white">
                    <Skeleton className="h-[160px] w-full rounded-xl bg-gray-100" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-3/4 mt-3 bg-gray-100" /> {/* Title */}
                        <Skeleton className="h-4 w-1/2 bg-gray-100" /> {/* Author */}
                        <Skeleton className="h-4 w-2/3 mt-8 bg-gray-100" /> {/* Description */}
                        <div className="flex justify-between items-center mt-5">
                            <Skeleton className="h-5 w-[80px] bg-gray-100" /> {/* Price */}
                            <Skeleton className="h-9 w-[80px] rounded-md bg-gray-100" /> {/* Button */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
