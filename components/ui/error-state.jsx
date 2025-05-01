"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Button } from "./button";

export function ErrorState(props) {
    const {
        icon: Icon,
        title,
        description,
        alertTitle,
        alertDescription,
        primaryActionLabel = "হোম পেজে যান",
        primaryActionHref = "/",
        secondaryActionLabel,
        secondaryActionHref,
        showBackButton = true,
        iconColor = "text-red-600",
        iconBgColor = "bg-red-100/80",
        headerBgColor = "bg-red-50",
        alertBgColor = "bg-amber-50",
        alertTextColor = "text-amber-700",
        alertTitleColor = "text-amber-800",
        children,
    } = props;

    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="overflow-hidden border-none shadow-lg">
                    <CardHeader className={`${headerBgColor} pb-8 pt-8`}>
                        <div className="flex flex-col items-center justify-center space-y-3 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.2,
                                }}
                                className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBgColor} ${iconColor}`}
                            >
                                <Icon className="h-8 w-8" />
                            </motion.div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                            <p className="text-gray-500">{description}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-6">
                        {(alertTitle || alertDescription) && (
                            <div className={`rounded-lg ${alertBgColor} p-4`}>
                                <div className="flex">
                                    {children ? (
                                        children
                                    ) : (
                                        <div className="ml-3">
                                            {alertTitle && (
                                                <h3 className={`text-sm font-medium ${alertTitleColor}`}>
                                                    {alertTitle}
                                                </h3>
                                            )}
                                            {alertDescription && (
                                                <div className={`mt-2 text-sm ${alertTextColor}`}>
                                                    <p>{alertDescription}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-3 bg-gray-50 px-6 py-4">
                        {showBackButton && (
                            <Button
                                onClick={() => router.back()}
                                variant="outline"
                                className="w-full justify-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                পূর্ববর্তী পৃষ্ঠায় ফিরে যান
                            </Button>
                        )}
                        <Button
                            onClick={() => router.push(primaryActionHref)}
                            className="w-full justify-center"
                        >
                            {primaryActionLabel}
                        </Button>
                        {secondaryActionLabel && secondaryActionHref && (
                            <Button
                                onClick={() => router.push(secondaryActionHref)}
                                variant="ghost"
                                className="w-full justify-center"
                            >
                                {secondaryActionLabel}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
