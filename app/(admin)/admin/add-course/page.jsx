"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicInfoForm } from "@/components/admin/course/basic-info-form"
import { CourseOverviewForm } from "@/components/admin/course/course-overview-form"
import { PricingMoreForm } from "@/components/admin/course/pricing-more-form"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { uploadToCloudinary } from "@/lib/uploadToCloudinary"
import axios from "axios"

// Define Zod schema for form validation
const courseFormSchema = z.object({
    // Step 1: Basic Info
    title: z.string().min(1, { message: "কোর্সের শিরোনাম আবশ্যক" }),
    category: z.string().min(1, { message: "কোর্স ক্যাটাগরি নির্বাচন করুন" }),
    description: z.string().min(10, { message: "বর্ণনা কমপক্ষে ১০ অক্ষর হতে হবে" }),
    tags: z.array(z.string()).min(1, { message: "কমপক্ষে একটি ট্যাগ আবশ্যক" }),

    // Step 2: Course Overview
    fullDescription: z.string().min(50, { message: "বিস্তারিত বর্ণনা কমপক্ষে ৫০ অক্ষর হতে হবে" }),
    courseThumbnail: z.any().optional(),
    whatInside: z.string().min(10, { message: "কোর্সের বিষয়বস্তু কমপক্ষে ১০ অক্ষর হতে হবে" }),
    courseImagePreview: z.string().min(1, { message: "কোর্সের ছবি আপলোড করুন" }),

    // Step 3: Pricing & More
    isPaid: z.boolean(),
    price: z.number().refine((val) => !val || val >= 0, { message: "মূল্য ঋণাত্মক হতে পারে না" }),
    batchInfo: z.string().optional(),
    classTiming: z.string().optional(),
    totalClasses: z.number().int().nonnegative({ message: "ক্লাস সংখ্যা ঋণাত্মক হতে পারে না" }),
    supportInfo: z.string().optional(),
    courseDuration: z.string().optional(),
    instructorName: z.string().optional(),
})


// Define step-specific validation schemas
const basicInfoSchema = courseFormSchema.pick({
    title: true,
    category: true,
    description: true,
    tags: true,
})

const courseOverviewSchema = courseFormSchema.pick({
    fullDescription: true,
    courseThumbnail: true,
    whatInside: true,
    courseImagePreview: true,
})

export default function AddCoursePage() {
    const [activeTab, setActiveTab] = useState("basic-info")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const methods = useForm({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            title: "",
            category: "",
            description: "",
            tags: [],
            fullDescription: "",
            whatInside: "",
            courseThumbnail: null,
            courseImagePreview: "",
            isPaid: false,
            price: 0,
            batchInfo: "",
            classTiming: "",
            totalClasses: 0,
            supportInfo: "",
            courseDuration: "",
            instructorName: "",
        },
        mode: "onChange",
    })

    const { formState } = methods

    const validateCurrentTab = async () => {
        if (activeTab === "basic-info") {
            try {
                const data = methods.getValues()
                const result = await basicInfoSchema.safeParseAsync({
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    tags: data.tags,
                })

                if (!result.success) {
                    // Focus on the first field with an error
                    const firstError = Object.keys(result.error.formErrors.fieldErrors)[0]
                    methods.setFocus(firstError)

                    toast.message("ফর্ম পূরণে ত্রুটি", {
                        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন",
                    })
                    return false
                }
                return true
            } catch (error) {
                return false
            }
        }

        if (activeTab === "course-overview") {
            try {
                const data = methods.getValues()
                const result = await courseOverviewSchema.safeParseAsync({
                    fullDescription: data.fullDescription,
                    whatInside: data.whatInside,
                    courseThumbnail: data.courseThumbnail,
                    courseImagePreview: data.courseImagePreview,
                })

                if (!result.success) {
                    toast.error("ফর্ম পূরণে ত্রুটি", {
                        description: "অনুগ্রহ করে কোর্সের বিবরণ সঠিকভাবে পূরণ করুন",
                        variant: "destructive",
                    })
                    return false
                }
                return true
            } catch (error) {
                return false
            }
        }

        return true
    }

    const handleTabChange = async (value) => {
        // Moving forward requires validation
        if (
            (value === "course-overview" && activeTab === "basic-info") ||
            (value === "pricing-more" && activeTab === "course-overview")
        ) {
            const isValid = await validateCurrentTab()
            if (!isValid) return
        }

        setActiveTab(value)
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true)

        try {
            // Validate paid courses have a price
            if (data.isPaid && (!data.price || data.price <= 0)) {
                toast.message("মূল্য নির্ধারণ করুন", {
                    description: "পেইড কোর্সের জন্য মূল্য নির্ধারণ করা আবশ্যক",
                })
                setIsSubmitting(false)
                return
            }

            // Upload image to Cloudinary if a file is selected
            let imageUrl = data.courseImagePreview
            if (data.courseThumbnail && typeof data.courseThumbnail !== "string") {
                imageUrl = await uploadToCloudinary(data.courseThumbnail)
            }

            // Prepare final payload
            const { courseImagePreview, ...rest } = data
            const payload = {
                ...rest,
                courseThumbnail: imageUrl,
            }
            // POST to your backend
            await axios.post("/api/courses", payload)

            setIsSuccess(true)
            toast.success("কোর্স সফলভাবে যুক্ত হয়েছে", {
                description: "আপনার নতুন কোর্স সিস্টেমে যুক্ত করা হয়েছে",
            })

            // Reset after 3 seconds
            setTimeout(() => {
                setIsSuccess(false)
                methods.reset()
                setActiveTab("basic-info")
            }, 3000)

        } catch (error) {
            console.error("Submit error:", error)
            toast.error("ত্রুটি", {
                description: "কোর্স যুক্ত করতে সমস্যা হয়েছে, আবার চেষ্টা করুন",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[60vh] p-4"
            >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                    <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">কোর্স সফলভাবে যুক্ত হয়েছে!</h2>
                <p className="text-muted-foreground mb-6">আপনার নতুন কোর্স সিস্টেমে যুক্ত করা হয়েছে</p>
                <div className="flex gap-4">
                    <Button
                        onClick={() => {
                            setIsSuccess(false)
                            methods.reset()
                            setActiveTab("basic-info")
                        }}
                    >
                        নতুন কোর্স যুক্ত করুন
                    </Button>
                    <Button variant="outline" onClick={() => (window.location.href = "/admin/courses")}>
                        কোর্স তালিকা দেখুন
                    </Button>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="m-6 md:m-8"><FormProvider {...methods}>
            <div className="container mx-auto py-6">
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">নতুন কোর্স যুক্ত করুন</CardTitle>
                        <CardDescription>আপনার নতুন কোর্সের সকল প্রয়োজনীয় তথ্য পূরণ করুন</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8">
                                <TabsTrigger value="basic-info">প্রাথমিক তথ্য</TabsTrigger>
                                <TabsTrigger value="course-overview">কোর্স বিবরণ</TabsTrigger>
                                <TabsTrigger value="pricing-more">মূল্য এবং অন্যান্য তথ্য</TabsTrigger>
                            </TabsList>

                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <TabsContent value="basic-info">
                                    <BasicInfoForm />
                                    <div className="flex justify-end mt-6">
                                        <Button type="button" onClick={() => handleTabChange("course-overview")}>
                                            পরবর্তী ধাপে যান
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="course-overview">
                                    <CourseOverviewForm />
                                    <div className="flex justify-between mt-6">
                                        <Button type="button" variant="outline" onClick={() => setActiveTab("basic-info")}>
                                            পেছনে যান
                                        </Button>
                                        <Button type="button" onClick={() => handleTabChange("pricing-more")}>
                                            পরবর্তী ধাপে যান
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="pricing-more">
                                    <PricingMoreForm />
                                    <div className="flex justify-between mt-6">
                                        <Button type="button" variant="outline" onClick={() => setActiveTab("course-overview")}>
                                            পেছনে যান
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                                            {isSubmitting ? "অপেক্ষা করুন..." : "কোর্স যুক্ত করুন"}
                                        </Button>
                                    </div>
                                </TabsContent>
                            </form>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </FormProvider></div>
    )
}
