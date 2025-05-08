"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, CheckCircle, Smartphone, User, BookOpen, Award, Lightbulb, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "নাম অবশ্যই দিতে হবে",
    }),
    phone: z.string().min(11, {
        message: "সঠিক মোবাইল নম্বর দিন",
    }),
    course: z.string({
        required_error: "কোর্স নির্বাচন করুন",
    }),
})

export function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
        },
    })

    function onSubmit(values) {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log(values)
            setIsSubmitting(false)
            setIsSuccess(true)

            // Reset success message after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000)

            // Reset form
            form.reset()
        }, 1500)
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 font-bengali">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Form */}
                <div className="relative">
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary-100 rounded-full opacity-70 blur-xl"></div>
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-100 rounded-full opacity-70 blur-xl"></div>

                    <div className="relative">
                        <div className="mb-8">
                            <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                নতুন ব্যাচ শুরু হচ্ছে
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">এখন ভর্তি হোন</h1>
                            <p className="text-gray-600">আমাদের কোর্সে ভর্তি হয়ে আপনার ক্যারিয়ার শুরু করুন। নিচের ফর্মটি পূরণ করুন।</p>
                        </div>

                        <Card className="border-none shadow-lg bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                            <CardContent className="p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                                                        <User className="h-4 w-4 text-primary-500" />
                                                        নাম
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="আপনার পূর্ণ নাম লিখুন"
                                                            {...field}
                                                            className="rounded-lg border-gray-200 focus-visible:ring-primary-500 transition-all duration-200"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                                                        <Smartphone className="h-4 w-4 text-primary-500" />
                                                        মোবাইল নম্বর
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="০১XXXXXXXXX"
                                                            {...field}
                                                            className="rounded-lg border-gray-200 focus-visible:ring-primary-500 transition-all duration-200"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-xs text-gray-500">১১ ডিজিটের মোবাইল নম্বর দিন</FormDescription>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="course"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4 text-primary-500" />
                                                        কোর্স নির্বাচন করুন
                                                    </FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} className="w-full">
                                                        <FormControl>
                                                            <SelectTrigger className="rounded-lg border-gray-200 focus:ring-primary-500 transition-all duration-200 w-full">
                                                                <SelectValue placeholder="কোর্স নির্বাচন করুন" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="rounded-lg flex">
                                                            <SelectItem value="web-development">ওয়েব ডেভেলপমেন্ট</SelectItem>
                                                            <SelectItem value="graphic-design">গ্রাফিক ডিজাইন</SelectItem>
                                                            <SelectItem value="digital-marketing">ডিজিটাল মার্কেটিং</SelectItem>
                                                            <SelectItem value="app-development">মোবাইল অ্যাপ ডেভেলপমেন্ট</SelectItem>
                                                            <SelectItem value="data-science">ডাটা সায়েন্স</SelectItem>
                                                            <SelectItem value="ui-ux">UI/UX ডিজাইন</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 hover:translate-y-[-2px]"
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg
                                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        অপেক্ষা করুন...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center justify-center">
                                                        {isSuccess ? (
                                                            <>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                সফলভাবে সম্পন্ন হয়েছে
                                                            </>
                                                        ) : (
                                                            <>ভর্তি নিশ্চিত করুন</>
                                                        )}
                                                    </span>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right side - CTA */}
                <div className="relative">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-100 rounded-full opacity-70 blur-xl"></div>
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-100 rounded-full opacity-70 blur-xl"></div>

                    <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-8 rounded-xl shadow-md border border-primary-100 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100 rounded-full opacity-20 transform translate-x-20 -translate-y-20"></div>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">আপনার ক্যারিয়ার উন্নতির সুবর্ণ সুযোগ</h2>
                                <p className="text-gray-700 mb-4">আমাদের প্রশিক্ষণ কেন্দ্রে ভর্তি হয়ে আপনি পাবেন:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="bg-primary-100 p-2 rounded-full mr-3 mt-0.5">
                                            <Award className="h-4 w-4 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">অভিজ্ঞ শিক্ষকদের দ্বারা প্রশিক্ষণ</h3>
                                            <p className="text-sm text-gray-600">ইন্ডাস্ট্রি এক্সপার্টদের কাছ থেকে শিখুন</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-primary-100 p-2 rounded-full mr-3 mt-0.5">
                                            <Lightbulb className="h-4 w-4 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">প্রজেক্ট ভিত্তিক শিক্ষা</h3>
                                            <p className="text-sm text-gray-600">বাস্তব প্রজেক্ট করে শিখুন</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-primary-100 p-2 rounded-full mr-3 mt-0.5">
                                            <Briefcase className="h-4 w-4 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">চাকরি পাওয়ার সহায়তা</h3>
                                            <p className="text-sm text-gray-600">জব প্লেসমেন্ট সাপোর্ট</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">৫০% ছাড়</div>
                                    <div className="text-gray-500 text-sm">সীমিত সময়ের জন্য</div>
                                </div>
                                <p className="text-gray-700 mb-4 font-medium">
                                    আমাদের কোর্সগুলো সম্পর্কে আরও জানতে এবং ক্যারিয়ার সম্ভাবনা সম্পর্কে বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।
                                </p>
                                <Link href="/courses"><Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg hover:translate-y-[-2px]">
                                    কোর্সে যুক্ত হোন
                                    <ArrowRight className="h-5 w-5" />
                                </Button></Link>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                                    <Smartphone className="h-4 w-4" />
                                    প্রশ্ন আছে? কল করুন: <span className="font-medium">০১৭১২-৩৪৫৬৭৮</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
