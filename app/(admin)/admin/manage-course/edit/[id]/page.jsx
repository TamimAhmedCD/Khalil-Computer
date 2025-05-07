"use client";
import { BasicInfoForm } from "@/components/admin/course/basic-info-form";
import { CourseOverviewForm } from "@/components/admin/course/course-overview-form";
import { PricingMoreForm } from "@/components/admin/course/pricing-more-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define Zod schema for form validation
const courseFormSchema = z.object({
    // Step 1: Basic Info
    title: z.string().min(1, { message: "কোর্সের শিরোনাম আবশ্যক" }),
    category: z.string().min(1, { message: "কোর্স ক্যাটাগরি নির্বাচন করুন" }),
    description: z
        .string()
        .min(10, { message: "বর্ণনা কমপক্ষে ১০ অক্ষর হতে হবে" }),
    tags: z.array(z.string()).min(1, { message: "কমপক্ষে একটি ট্যাগ আবশ্যক" }),

    // Step 2: Course Overview
    fullDescription: z
        .string()
        .min(50, { message: "বিস্তারিত বর্ণনা কমপক্ষে ৫০ অক্ষর হতে হবে" }),
    courseThumbnail: z.any().optional(),
    whatInside: z
        .string()
        .min(10, { message: "কোর্সের বিষয়বস্তু কমপক্ষে ১০ অক্ষর হতে হবে" }),
    courseImagePreview: z.string().min(1, { message: "কোর্সের ছবি আপলোড করুন" }),

    // Step 3: Pricing & More
    isPaid: z.boolean(),
    price: z.number().refine((val) => !val || val >= 0, {
        message: "মূল্য ঋণাত্মক হতে পারে না",
    }),
    batchInfo: z.string().optional(),
    classTiming: z.string().optional(),
    totalClasses: z
        .number()
        .int()
        .nonnegative({ message: "ক্লাস সংখ্যা ঋণাত্মক হতে পারে না" }),
    supportInfo: z.string().optional(),
    courseDuration: z.string().optional(),
    instructorName: z.string().optional(),
    discount: z.number().optional(),
});

// Define step-specific validation schemas
const basicInfoSchema = courseFormSchema.pick({
    title: true,
    category: true,
    description: true,
    tags: true,
});

const courseOverviewSchema = courseFormSchema.pick({
    fullDescription: true,
    courseThumbnail: true,
    whatInside: true,
    courseImagePreview: true,
});

const fetchCourse = async (id) => {
    const res = await axios.get(`/api/admin/courses/${id}`);
    return res.data;
};

export default function EditCoursePage() {
    const params = useParams();
    const id = params.id;
    const [published, setPublished] = useState(false);
    const [activeTab, setActiveTab] = useState("basic-info");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
            discount: 0,
        },
        mode: "onChange",
    });

    // Destructure reset from methods
    const { reset } = methods;

    // Fetch course
    const { data: course, isLoading, isError, refetch } = useQuery({
        queryKey: ['course', id],
        queryFn: () => fetchCourse(id),
        enabled: !!id,
    });

    // Reset form with course data when it arrives
    useEffect(() => {
        if (course) {
            reset({
                title: course.title ?? "",
                category: course.category ?? "",
                description: course.description ?? "",
                tags: course.tags ?? [],
                fullDescription: course.fullDescription ?? "",
                whatInside: course.whatInside ?? "",
                courseThumbnail: course.courseThumbnail ?? null,
                courseImagePreview: course.courseImagePreview ?? "",
                isPaid: course.isPaid ?? false,
                price: course.price ?? 0,
                batchInfo: course.batchInfo ?? "",
                classTiming: course.classTiming ?? "",
                totalClasses: course.totalClasses ?? 0,
                supportInfo: course.supportInfo ?? "",
                courseDuration: course.courseDuration ?? "",
                instructorName: course.instructorName ?? "",
                discount: course.discount ?? 0,
            });
        }
    }, [course, reset]);

    const validateCurrentTab = async () => {
        if (activeTab === "basic-info") {
            try {
                const data = methods.getValues();
                const result = await basicInfoSchema.safeParseAsync({
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    tags: data.tags,
                });

                if (!result.success) {
                    // Focus on the first field with an error
                    const firstError = Object.keys(
                        result.error.formErrors.fieldErrors
                    )[0];
                    methods.setFocus(firstError);

                    toast.message("ফর্ম পূরণে ত্রুটি", {
                        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন",
                    });
                    return false;
                }
                return true;
            } catch (error) {
                return false;
            }
        }

        if (activeTab === "course-overview") {
            try {
                const data = methods.getValues();
                const result = await courseOverviewSchema.safeParseAsync({
                    fullDescription: data.fullDescription,
                    whatInside: data.whatInside,
                    courseThumbnail: data.courseThumbnail,
                    courseImagePreview: data.courseImagePreview,
                });

                if (!result.success) {
                    toast.error("ফর্ম পূরণে ত্রুটি", {
                        description: "অনুগ্রহ করে কোর্সের বিবরণ সঠিকভাবে পূরণ করুন",
                        variant: "destructive",
                    });
                    return false;
                }
                return true;
            } catch (error) {
                return false;
            }
        }

        return true;
    };

    const handleTabChange = async (value) => {
        // Moving forward requires validation
        if (
            (value === "course-overview" && activeTab === "basic-info") ||
            (value === "pricing-more" && activeTab === "course-overview")
        ) {
            const isValid = await validateCurrentTab();
            if (!isValid) return;
        }

        setActiveTab(value);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // Validate paid courses have a price
            if (data.isPaid && (!data.price || data.price <= 0)) {
                toast.message("মূল্য নির্ধারণ করুন", {
                    description: "পেইড কোর্সের জন্য মূল্য নির্ধারণ করা আবশ্যক",
                });
                setIsSubmitting(false);
                return;
            }

            // Upload image to Cloudinary if a file is selected
            let imageUrl = data.courseImagePreview;
            if (data.courseThumbnail && typeof data.courseThumbnail !== "string") {
                imageUrl = await uploadToCloudinary(data.courseThumbnail);
            }

            // // Prepare final payload
            // const { courseImagePreview, ...rest } = data;
            const payload = {
                ...data,
                courseThumbnail: imageUrl,
                published: published,
                createdAt: new Date().toISOString(),
            };
            // POST to your backend
            await axios.put(`/api/admin/courses/${id}`, payload);

            setIsSuccess(true);
            toast.success("কোর্স সফলভাবে যুক্ত হয়েছে", {
                description: "আপনার নতুন কোর্স সিস্টেমে যুক্ত করা হয়েছে",
            });

            // Reset after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
                methods.reset();
                setActiveTab("basic-info");
            }, 3000);
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("ত্রুটি", {
                description: "কোর্স যুক্ত করতে সমস্যা হয়েছে, আবার চেষ্টা করুন",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="m-6 md:m-8">
            <FormProvider {...methods}>
                <div className="container mx-auto py-6">
                    <Card className="border shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">কোর্স আপডেট করুন</CardTitle>
                            <CardDescription>
                                আপনার কোর্সের প্রয়োজনীয় তথ্য সম্পাদনা করুন এবং হালনাগাদ করুন।
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                value={activeTab}
                                onValueChange={handleTabChange}
                                className="w-full"
                            >
                                <TabsList className="grid w-full grid-cols-3 mb-8">
                                    <TabsTrigger value="basic-info">প্রাথমিক তথ্য</TabsTrigger>
                                    <TabsTrigger value="course-overview">কোর্স বিবরণ</TabsTrigger>
                                    <TabsTrigger value="pricing-more">
                                        মূল্য এবং অন্যান্য তথ্য
                                    </TabsTrigger>
                                </TabsList>

                                <form onSubmit={methods.handleSubmit(onSubmit)}>
                                    <TabsContent value="basic-info">
                                        <BasicInfoForm />
                                        <div className="flex justify-end mt-6">
                                            <Button
                                                type="button"
                                                onClick={() => handleTabChange("course-overview")}
                                            >
                                                পরবর্তী ধাপে যান
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="course-overview">
                                        <CourseOverviewForm />
                                        <div className="flex justify-between mt-6">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setActiveTab("basic-info")}
                                            >
                                                পেছনে যান
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => handleTabChange("pricing-more")}
                                            >
                                                পরবর্তী ধাপে যান
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="pricing-more">
                                        <PricingMoreForm />
                                        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:justify-between sm:items-center">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setActiveTab("course-overview")}
                                                className="w-full sm:w-auto"
                                            >
                                                পেছনে যান
                                            </Button>

                                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 w-full sm:w-auto">
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    onClick={() => setPublished(false)}
                                                    variant="outline"
                                                    className="w-full sm:w-auto"
                                                >
                                                    {isSubmitting
                                                        ? "অপেক্ষা করুন..."
                                                        : "ড্রাফ্‌ট সংরক্ষণ করুন"}
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    onClick={() => setPublished(true)}
                                                    className="bg-primary-600 hover:bg-primary-700 w-full sm:w-auto"
                                                >
                                                    {isSubmitting
                                                        ? "অপেক্ষা করুন..."
                                                        : "কোর্স যুক্ত করুন"}
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </form>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </FormProvider>
        </div>
    );
}
