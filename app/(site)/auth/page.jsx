"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { AuthIllustration } from "@/components/auth/auth-illustration"

export default function AuthPage() {
    const [authMode, setAuthMode] = useState("login");

    return (
        <div className="flex min-h-screen flex-col mt-10">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="grid md:grid-cols-2">
                        {/* Left side - Illustration */}
                        <div className="hidden bg-primary-600 p-12 text-white md:block">
                            <div className="flex h-full flex-col justify-between">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold">খলিল কম্পিউটার</h1>
                                    <p className="mt-2 text-primary-100">আপনার ভবিষ্যৎ গড়ুন আমাদের সাথে</p>
                                </div>

                                <AuthIllustration />

                                <div className="mt-8">
                                    <h2 className="text-xl font-semibold">
                                        {authMode === "login" ? "আপনার অ্যাকাউন্টে লগইন করুন" : "নতুন অ্যাকাউন্ট তৈরি করুন"}
                                    </h2>
                                    <p className="mt-2 text-primary-100">
                                        {authMode === "login" ? "আপনার শিক্ষা যাত্রা শুরু করতে লগইন করুন" : "আমাদের সাথে যোগ দিয়ে আপনার দক্ষতা উন্নত করুন"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Auth forms */}
                        <div className="p-6 sm:p-8 md:p-12">
                            <div className="mb-8 md:hidden">
                                <h1 className="text-2xl font-bold text-gray-900">খলিল কম্পিউটার</h1>
                                <p className="mt-2 text-gray-600">আপনার ভবিষ্যৎ গড়ুন আমাদের সাথে</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {authMode === "login" ? "লগইন করুন" : "রেজিস্ট্রেশন করুন"}
                                </h2>
                                <p className="mt-2 text-gray-600">
                                    {authMode === "login" ? "আপনার অ্যাকাউন্টে প্রবেশ করতে আপনার তথ্য দিন" : "নতুন অ্যাকাউন্ট তৈরি করতে আপনার তথ্য দিন"}
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={authMode}
                                    initial={{ opacity: 0, x: authMode === "login" ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: authMode === "login" ? 20 : -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {authMode === "login" ? (
                                        <LoginForm onSwitchMode={() => setAuthMode("signup")} />
                                    ) : (
                                        <SignupForm onSwitchMode={() => setAuthMode("login")} />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
