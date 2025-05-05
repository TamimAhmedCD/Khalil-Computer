import { Skeleton } from "../ui/skeleton";

export default function CourseCardSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3 p-4 border rounded-xl">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4 mt-3" /> {/* Title */}
                        <Skeleton className="h-4 w-1/2" /> {/* Author */}
                        <Skeleton className="h-4 w-2/3 mt-8" /> {/* Stroke / Description */}
                        <div className="flex justify-between items-center mt-5">
                            <Skeleton className="h-4 w-[80px]" /> {/* Price */}
                            <Skeleton className="h-8 w-[80px]" /> {/* Button */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
