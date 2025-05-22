"use client"

import { useState, useRef } from "react"
import { ArrowRight, Play, Sparkles, GraduationCap, Clock, CheckCircle, Award, Users } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Admission } from "../Admission/admission"
import Link from "next/link"

export default function AdvertisementSection() {
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })
    const videoRef = useRef(null)
    const videoInView = useInView(videoRef, { once: true, amount: 0.5 })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    }

    return (
        <section className="w-full pt-10 md:pt-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-primary-200/30 blur-3xl"></div>
                <div className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-primary-100/40 blur-3xl"></div>
                {/* <div className="absolute top-[40%] left-[20%] w-6 h-6 rounded-full bg-primary-400 animate-pulse-slow"></div> */}
                <div
                    className="absolute top-[15%] left-[30%] w-3 h-3 rounded-full bg-primary-600 animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute bottom-[30%] right-[25%] w-4 h-4 rounded-full bg-primary-500 animate-pulse-slow"
                    style={{ animationDelay: "2s" }}
                ></div>

                <svg
                    className="absolute top-[5%] right-[15%] w-[600px] h-[600px] text-primary-100 opacity-30 animate-spin-slow"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0ZM100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <div className="" ref={containerRef}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center"
                >
                    {/* Left Column - Text Content */}
                    <motion.div variants={staggerContainer} className="space-y-8">
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium border border-primary-200"
                        >
                            <Sparkles className="h-4 w-4 mr-2 text-primary-600" />
                            <span>প্রিমিয়াম কোর্স</span>
                        </motion.div>

                        <motion.h2
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900"
                        >
                            <span className="text-primary-700">আমাদের</span> বিজ্ঞাপন
                        </motion.h2>

                        <motion.div variants={staggerContainer} className="space-y-6">
                            <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-gray-600">
                                আমাদের প্রতিষ্ঠানে বেসিক কম্পিউটার, গ্রাফিক ডিজাইন (লেভেল ১-৩) ও ওয়েব ডিজাইন-ডেভেলপমেন্ট কোর্স শেখানো হয় বাস্তব অভিজ্ঞতা ও প্রজেক্ট-ভিত্তিক পদ্ধতিতে। প্রতিটি কোর্সে রয়েছে হাতে-কলমে প্রশিক্ষণ, প্রফেশনাল গাইডলাইন ও মার্কেটপ্লেস প্রস্তুতি। দক্ষতা অর্জনে নিশ্চিত সাপোর্ট ও একটি উজ্জ্বল ভবিষ্যতের প্রতিশ্রুতি দিচ্ছি আমরা।
                            </motion.p>

                            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4">
                                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-primary-100 hover:shadow-md hover:border-primary-200 transition-all duration-300">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-primary-100 rounded-lg text-primary-700">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">অভিজ্ঞ শিক্ষক</h4>
                                        <p className="text-sm text-gray-500 mt-1">শিল্পের অভিজ্ঞদের দ্বারা প্রশিক্ষণ</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-primary-100 hover:shadow-md hover:border-primary-200 transition-all duration-300">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-primary-100 rounded-lg text-primary-700">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">নমনীয় সময়সূচী</h4>
                                        <p className="text-sm text-gray-500 mt-1">অনলাইন এবং অফলাইন ক্লাস</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Admission triggerElements={<Button
                                size="lg"
                                className="group relative overflow-hidden rounded-xl bg-primary-600 text-white font-medium px-8 py-6 text-lg shadow-lg shadow-primary-200/50 hover:bg-primary-700 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center">
                                    আজই নিবন্ধন করুন
                                    <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform duration-200" />
                                </span>
                            </Button>}
                            />
                            <Link href={'/contact-us'}><Button
                                variant="outline"
                                size="lg"
                                className="rounded-xl border-primary-200 text-primary-700 font-medium px-8 py-6 text-lg hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
                            >
                                <span className="flex items-center">আরও জানুন</span>
                            </Button></Link>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                                        <img
                                            src={`/placeholder.svg?height=32&width=32&text=${i}`}
                                            alt="Student"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold text-primary-700">৫৫০+</span> শিক্ষার্থী ইতিমধ্যে যোগ দিয়েছে
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Video */}
                    <div className="relative" ref={videoRef}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={videoInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            style={{ y }}
                            className="relative z-10"
                        >
                            {/* Video card with glass effect */}
                            {/* <div className="absolute -inset-3 bg-gradient-to-r from-primary-200 via-primary-100 to-primary-300 rounded-2xl blur-lg opacity-70"></div> */}
                            <Card
                                className="relative overflow-hidden rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm border border-primary-100 p-0"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                                    <iframe
                                        src="https://www.facebook.com/plugins/video.php?height=317&href=https%3A%2F%2Fweb.facebook.com%2FKhalilComputerTrainingSchool%2Fvideos%2F2408770632834988%2F&show_text=false&width=560&t=0"
                                        className="absolute inset-0 w-full h-full border-0"
                                        style={{ overflow: "hidden" }}
                                        scrolling="no"
                                        frameBorder="0"
                                        allowFullScreen={true}
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    ></iframe>
                                    {/* {isHovered && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity">
                                            <div className="rounded-full bg-white/90 p-5 shadow-lg transform hover:scale-110 transition-transform duration-200">
                                                <Play className="h-8 w-8 text-primary-600" />
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                                <div className="p-6 bg-white">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-xl text-gray-900">খলিল কম্পিউটার ট্রেনিং স্কুল</h3>
                                        <div className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">
                                            নতুন ভিডিও
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        আমাদের সাম্প্রতিক কোর্স এবং সাফল্যের গল্প দেখুন। আমাদের শিক্ষার্থীরা কীভাবে তাদের ক্যারিয়ার গড়ে তুলেছে তা জানুন।
                                    </p>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Users className="h-4 w-4 text-primary-500" />
                                            <span>১২৫+ দর্শক</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Award className="h-4 w-4 text-primary-500" />
                                            <span>সেরা কোর্স</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-primary-100 rounded-full"></div>
                        <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary-200 rounded-full"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
