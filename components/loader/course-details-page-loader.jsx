import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function CourseDetailsPageLoader() {
    return (
        <div className="container mx-auto px-5 md:px-10 lg:px-20 py-10">
            {/* Title and Tags */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-[280px] bg-gray-100" />
                    <Skeleton className="h-4 w-[180px] bg-gray-100" />
                </div>
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-7 w-[60px] rounded-full bg-gray-100" />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Course Image */}
                    <Skeleton className="h-[340px] w-full rounded-lg bg-gray-100" />

                    {/* Course Description */}
                    <div className="p-6 border rounded-lg space-y-3 bg-white">
                        <Skeleton className="h-6 w-1/3 bg-gray-100" />
                        <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-full bg-gray-100" />
                            ))}
                        </div>
                    </div>

                    {/* What You'll Learn */}
                    <div className="p-6 border rounded-lg space-y-4 bg-white">
                        <Skeleton className="h-6 w-1/2 bg-gray-100" />
                        <div className="space-y-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Skeleton className="h-3 w-3 rounded-full bg-gray-100" />
                                    <Skeleton className="h-4 w-full bg-gray-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Modules */}
                    <div className="p-6 border rounded-lg space-y-4 bg-white">
                        <Skeleton className="h-6 w-1/2 bg-gray-100" />
                        <div className="space-y-2">
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full rounded bg-gray-100" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-6 space-y-6 bg-white">
                        {/* Price */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[120px] bg-gray-100" />
                            <Skeleton className="h-10 w-[180px] bg-gray-100" />
                        </div>

                        {/* Enroll Button */}
                        <Skeleton className="h-12 w-full rounded-md bg-gray-100" />

                        {/* Instructor */}
                        <div className="space-y-3 border-t pt-4">
                            <Skeleton className="h-4 w-[100px] bg-gray-100" />
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full bg-gray-100" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-[120px] bg-gray-100" />
                                    <Skeleton className="h-3 w-[90px] bg-gray-100" />
                                </div>
                            </div>
                        </div>

                        {/* Course Details */}
                        <div className="space-y-3 border-t pt-4">
                            <Skeleton className="h-4 w-[80px] bg-gray-100" />
                            <div className="space-y-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-[60px] bg-gray-100" />
                                        <Skeleton className="h-4 w-[80px] bg-gray-100" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-3 border-t pt-4">
                            <Skeleton className="h-4 w-[120px] bg-gray-100" />
                            <div className="space-y-2">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-4 w-full bg-gray-100" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
