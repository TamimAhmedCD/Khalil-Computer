"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardLoader() {
    return (
        <div className="space-y-6 container mx-auto px-5 md:px-10 lg:px-20 mt-10">
            {/* Header skeleton */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex items-center gap-2">
                    {Array(4)
                        .fill(null)
                        .map((_, i) => (
                            <Skeleton key={i} className="h-8 w-16 rounded-md" />
                        ))}
                </div>
            </div>

            {/* Welcome card skeleton */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardContent className="p-0">
                            <div className="relative overflow-hidden bg-gradient-to-r from-primary-600/30 to-primary-800/30 p-6">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-48" />
                                        <Skeleton className="h-4 w-64" />
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Skeleton className="h-9 w-32 rounded-md" />
                                    <Skeleton className="h-9 w-40 rounded-md" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <Card>
                        <CardHeader className="pb-3">
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-2">
                            {Array(5)
                                .fill(null)
                                .map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 rounded-md p-3">
                                        <Skeleton className="h-9 w-9 rounded-full" />
                                        <Skeleton className="h-5 w-24" />
                                    </div>
                                ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Stats cards skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array(4)
                    .fill(null)
                    .map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                            <Card className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex items-center justify-between p-6">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-7 w-16" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                    </div>
                                    <div className="h-2 w-full bg-gray-200" />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
            </div>

            {/* Charts skeleton */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {Array(2)
                    .fill(null)
                    .map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        >
                            <Card>
                                <CardHeader className="pb-2">
                                    <Skeleton className="h-5 w-40" />
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full rounded-md bg-gray-100">
                                        <div className="flex h-full w-full items-center justify-center">
                                            <PulsingLoader />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
            </div>

            {/* Performance chart and calendar skeleton */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Skeleton className="h-5 w-40" />
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-[240px] rounded-md" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full rounded-md bg-gray-100">
                                <div className="flex h-full w-full items-center justify-center">
                                    <PulsingLoader />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
                    <Card>
                        <CardHeader className="pb-2">
                            <Skeleton className="h-5 w-24" />
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-4">
                                <Skeleton className="h-[240px] w-full rounded-md" />
                            </div>
                            <div className="border-t p-4">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-5 w-32" />
                                    <div className="flex gap-1">
                                        <Skeleton className="h-7 w-7 rounded-md" />
                                        <Skeleton className="h-7 w-7 rounded-md" />
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    {Array(2)
                                        .fill(null)
                                        .map((_, i) => (
                                            <Skeleton key={i} className="h-16 w-full rounded-md" />
                                        ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Activity feed skeleton */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-8 w-[400px] rounded-md" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Array(4)
                                .fill(null)
                                .map((_, i) => (
                                    <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Skeleton className="h-5 w-32" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </div>
                                ))}
                            <div className="flex justify-center pt-4">
                                <Skeleton className="h-9 w-24 rounded-md" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

// Pulsing loader animation for chart areas
function PulsingLoader() {
    return (
        <div className="flex items-center justify-center space-x-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="h-3 w-3 rounded-full bg-primary-300"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}
