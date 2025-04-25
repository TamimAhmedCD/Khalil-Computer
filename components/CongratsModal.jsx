"use client"

import { useState, useEffect } from "react"
import Confetti from "react-confetti"
import { motion } from "framer-motion"
import { X, CheckCircle, PartyPopper } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export function CongratsModal({ isOpen, onClose, studentName = "" }) {
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
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={true}
                numberOfPieces={200}
                gravity={0.15}
                colors={["#3b82f6", "#2563eb", "#93c5fd", "#60a5fa", "#dbeafe", "#eff6ff", "#bfdbfe"]}
            />

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
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
                        initial={{ rotate: -10, y: 10 }}
                        animate={{ rotate: [0, -10, 10, -5, 5, 0], y: [0, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                        className="rounded-full bg-primary-100 p-4"
                    >
                        <PartyPopper className="h-12 w-12 text-primary-600" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="mb-1 text-2xl font-bold text-primary-700">অভিনন্দন!</h2>
                    <p className="mb-4 text-lg font-medium text-gray-700">
                        {studentName ? `${studentName}, ` : ""}
                        আপনার ফর্ম সফলভাবে জমা হয়েছে!
                    </p>

                    <div className="mb-6 rounded-lg bg-green-50 p-3">
                        <div className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                            <p className="text-sm text-green-700">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button onClick={onClose} className="flex-1 bg-primary-600 text-white hover:bg-primary-700">
                            ঠিক আছে
                        </Button>
                        <Link href="/"><Button
                            variant="outline"
                            className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50"
                        >
                            হোম পেজে যান
                        </Button></Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
