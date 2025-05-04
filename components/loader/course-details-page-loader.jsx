import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function CourseDetailsPageLoader() {
    return (
        <div className="p-4">
            <main className="flex-1">
                <div className="py-10">
                    {/* Title and Tags */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-2">
                        <Skeleton className="h-8 w-[300px]" />
                        <div className="flex gap-2">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-8 w-[60px] rounded-full" />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2">
                            <Skeleton className="h-[300px] w-full rounded-lg mb-5" />

                            <div className="p-6 border rounded-lg space-y-3 mb-6">
                                <Skeleton className="h-6 w-1/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            <div className="p-6 border rounded-lg space-y-3">
                                <Skeleton className="h-6 w-1/2" />
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-4 w-full" />
                                ))}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1">
                            <div className="border rounded-lg p-6 sticky top-4 space-y-6">
                                <Skeleton className="h-8 w-[120px]" /> {/* Price */}
                                <Skeleton className="h-12 w-full rounded-md" /> {/* Button */}

                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-[150px]" /> {/* Instructor Label */}
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <div className="space-y-1">
                                            <Skeleton className="h-4 w-[100px]" />
                                            <Skeleton className="h-3 w-[80px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
