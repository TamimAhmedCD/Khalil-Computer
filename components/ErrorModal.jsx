"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from "./ui/button"

export function ErrorModal({ isOpen, onClose, onRetry, errorMessage = "" }) {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative mx-4 max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="mb-4 flex justify-center">
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                        className="rounded-full bg-red-100 p-4"
                    >
                        <AlertTriangle className="h-12 w-12 text-red-500" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="mb-1 text-2xl font-bold text-red-600">দুঃখিত!</h2>
                    <p className="mb-4 text-lg font-medium text-gray-700">
                        ফর্ম জমা দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
                    </p>

                    <div className="mb-6 rounded-lg bg-red-50 p-3 text-left">
                        <p className="text-sm text-red-700">
                            {errorMessage || "ইন্টারনেট সংযোগ চেক করুন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন।"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {onRetry && (
                            <Button
                                onClick={onRetry}
                                className="flex-1 items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700"
                            >
                                <RefreshCw className="h-4 w-4" />
                                আবার চেষ্টা করুন
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            বন্ধ করুন
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
