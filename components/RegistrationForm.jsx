"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronRightIcon, InfoIcon, Pencil, BookOpen, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Separator } from "./ui/separator"
import { Input } from "./ui/input"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { CongratsModal } from "./CongratsModal"
import axios from "axios"
import { ErrorModal } from "./ErrorModal"
import { HierarchicalDatePicker } from "./DatePicker"

const formSchema = z.object({
    studentName: z.string().min(2, {
        message: "নাম অবশ্যই দিতে হবে",
    }),
    fatherName: z.string().min(2, {
        message: "পিতার নাম অবশ্যই দিতে হবে",
    }),
    motherName: z.string().min(2, {
        message: "মাতার নাম অবশ্যই দিতে হবে",
    }),
    currentAddress: z.string().min(5, {
        message: "বর্তমান ঠিকানা অবশ্যই দিতে হবে",
    }),
    studentMobile: z.string().min(11, {
        message: "সঠিক মোবাইল নম্বর দিন",
    }),
    education: z.string().min(2, {
        message: "শিক্ষাগত যোগ্যতা অবশ্যই দিতে হবে",
    }),
    birthDate: z.date({
        required_error: "জন্ম তারিখ অবশ্যই দিতে হবে",
    }),
    occupation: z.string().min(2, {
        message: "পেশা অবশ্যই দিতে হবে",
    }),
    maritalStatus: z.string({
        required_error: "বৈবাহিক অবস্থা নির্বাচন করুন",
    }),
    course: z.string({
        required_error: "কোর্স নির্বাচন করুন",
    }),
    gender: z.string({
        required_error: "লিঙ্গ নির্বাচন করুন",
    }),
})

export function RegistrationForm() {
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [formValues, setFormValues] = useState(null)
    const [submittedName, setSubmittedName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentName: "",
            fatherName: "",
            motherName: "",
            currentAddress: "",
            permanentAddress: "",
            studentMobile: "",
            guardianMobile: "",
            email: "",
            education: "",
            occupation: "",
            bloodGroup: "",
        },
    })

    async function submitForm(data) {
        setIsSubmitting(true)

        try {
            const postStudentData = await axios.post("/api/registered-students", data)
            const studentData = await postStudentData.data
            const sendEmail = await axios.post("/api/mail", data)
            if (studentData.message && sendEmail.data.message) {
                setSubmittedName(data.studentName)
                setShowSuccessModal(true)
            } else {
                console.log("Registration Failed", studentData.message);
                setErrorMessage(studentData.message || "নিবন্ধন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।")
                setShowErrorModal(true)
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            setErrorMessage("সার্ভারের সাথে যোগাযোগ করা যায়নি। আপনার ইন্টারনেট সংযোগ চেক করুন।")
            setShowErrorModal(true)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    function onSubmit(data) {
        setFormValues(data)
        submitForm(data).then(() => {
            form.reset()
        })
    }

    function handleRetry() {
        if (formValues) {
            submitForm(formValues)
        }
        setShowErrorModal(false)
    }

    return (
        <div className="space-y-8 mt-5 font-hind-siliguri">
            <Card className="border-none bg-primary-100/5s overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                <CardHeader className="space-y-1 pb-6">
                    <div className="flex justify-center mb-2">
                        <div className="bg-primary-500 text-white p-3 rounded-full">
                            <Pencil className="h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-center text-primary-700">
                        📢 ফ্রি সেমিনারে অংশগ্রহণ করুন

                    </CardTitle>
                    <CardDescription className="text-base text-center">
                        অনুগ্রহ করে নিচের ফর্মটি সঠিকভাবে পূরণ করুন। সকল তথ্য অবশ্যই সত্য ও সঠিকভাবে প্রদান করতে হবে যাতে আপনার অংশগ্রহণ নিশ্চিত করা যায়।
                    </CardDescription>
                </CardHeader>
            </Card>

            <Alert className="bg-primary-50 border-primary-200 border-2 rounded-xl">
                <InfoIcon className="h-5 w-5 text-primary-500" />
                <AlertTitle className="text-base font-medium text-primary-700">ফর্ম পূরণের নির্দেশাবলী</AlertTitle>
                <AlertDescription className="mt-2 text-sm">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>সকল তারকা (*) চিহ্নিত ঘর অবশ্যই পূরণ করতে হবে</li>
                        <li>মোবাইল নম্বর ১১ ডিজিটের হতে হবে (উদাহরণ: ০১৭১২৩৪৫৬৭৮)</li>
                        <li>ফর্ম পূরণ শেষে "জমা দিন" বাটনে ক্লিক করুন</li>
                        <li>ফর্ম জমা দেওয়ার পর একটি নিশ্চিতকরণ বার্তা দেখানো হবে</li>
                        <li>কোন সমস্যা হলে প্রশিক্ষণ কেন্দ্রের হেল্পলাইন নম্বরে যোগাযোগ করুন</li>
                    </ul>
                </AlertDescription>
            </Alert>

            <Card className="border rounded-xl overflow-hidden border-primary-200">
                <CardContent className="p-6 pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 bg-primary-100 p-3 rounded-lg">
                                    <div className="bg-primary-500 text-white p-2 rounded-full">
                                        <Pencil className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary-700">ব্যক্তিগত তথ্য</h3>
                                </div>
                                <Separator className="my-2 bg-primary-100" />

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="studentName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">শিক্ষার্থীর নাম *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="পূর্ণ নাম লিখুন"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <HierarchicalDatePicker form={form} name="birthDate" label="জন্ম তারিখ *" placeholder="তারিখ নির্বাচন করুন" />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="fatherName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">পিতার নাম *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="পিতার নাম লিখুন"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="motherName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">মাতার নাম *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="মাতার নাম লিখুন"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-primary-700 font-medium">লিঙ্গ *</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex space-x-4"
                                                    >
                                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="পুরুষ" className="text-primary-600" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">পুরুষ</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="মহিলা" className="text-primary-600" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">মহিলা</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="অন্যান্য" className="text-primary-600" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">অন্যান্য</FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="maritalStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">বৈবাহিক অবস্থা *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-primary-200 focus:ring-primary-500 rounded-lg">
                                                            <SelectValue placeholder="বৈবাহিক অবস্থা নির্বাচন করুন" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-lg">
                                                        <SelectItem value="অবিবাহিত">অবিবাহিত</SelectItem>
                                                        <SelectItem value="বিবাহিত">বিবাহিত</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 bg-primary-100 p-3 rounded-lg">
                                    <div className="bg-primary-500 text-white p-2 rounded-full">
                                        <Home className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary-700">যোগাযোগের তথ্য</h3>
                                </div>
                                <Separator className="my-2 bg-primary-100" />

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="currentAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">বর্তমান ঠিকানা *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="বর্তমান ঠিকানা লিখুন"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="permanentAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">স্থায়ী ঠিকানা </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="স্থায়ী ঠিকানা লিখুন"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="studentMobile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">শিক্ষার্থীর মোবাইল নম্বর *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="০১XXXXXXXXX"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs">১১ ডিজিটের মোবাইল নম্বর দিন</FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="guardianMobile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">অভিভাবকের মোবাইল নম্বর </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="০১XXXXXXXXX"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs">১১ ডিজিটের মোবাইল নম্বর দিন</FormDescription>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary-700 font-medium">শিক্ষার্থীর ইমেইল </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="example@mail.com"
                                                    {...field}
                                                    className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 bg-primary-100 p-3 rounded-lg">
                                    <div className="bg-primary-500 text-white p-2 rounded-full">
                                        <BookOpen className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary-700">শিক্ষাগত ও অন্যান্য তথ্য</h3>
                                </div>
                                <Separator className="my-2 bg-primary-100" />

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="education"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">সর্বোচ্চ শিক্ষাগত যোগ্যতা *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-primary-200 focus:ring-primary-500 rounded-lg">
                                                            <SelectValue placeholder="শিক্ষাগত যোগ্যতা লিখুন" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-lg">
                                                        <SelectItem value="ষষ্ঠ শ্রেণী">ষষ্ঠ শ্রেণী</SelectItem>
                                                        <SelectItem value="সপ্তম শ্রেণী">সপ্তম শ্রেণী</SelectItem>
                                                        <SelectItem value="অষ্টম শ্রেণী">অষ্টম শ্রেণী</SelectItem>
                                                        <SelectItem value="নবম শ্রেণী">নবম শ্রেণী</SelectItem>
                                                        <SelectItem value="দশম শ্রেণী">দশম শ্রেণী</SelectItem>
                                                        <SelectItem value="এসএসসি পাস">এসএসসি পাস</SelectItem>
                                                        <SelectItem value="একাদশ শ্রেণী">একাদশ শ্রেণী</SelectItem>
                                                        <SelectItem value="দ্বাদশ শ্রেণী">দ্বাদশ শ্রেণী</SelectItem>
                                                        <SelectItem value="এইচএসসি পাস">এইচএসসি পাস</SelectItem>
                                                        <SelectItem value="অনার্স ১ম বর্ষ">অনার্স ১ম বর্ষ</SelectItem>
                                                        <SelectItem value="অনার্স ২য় বর্ষ">অনার্স ২য় বর্ষ</SelectItem>
                                                        <SelectItem value="অনার্স ৩য় বর্ষ">অনার্স ৩য় বর্ষ</SelectItem>
                                                        <SelectItem value="অনার্স ৪র্থ বর্ষ">অনার্স ৪র্থ বর্ষ</SelectItem>

                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="occupation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">পেশা *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-primary-200 focus:ring-primary-500 rounded-lg">
                                                            <SelectValue placeholder="আপনার পেশা নির্বাচন করুন" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-lg">
                                                        <SelectItem value="ছাত্র/ছাত্রী">ছাত্র/ছাত্রী</SelectItem>
                                                        <SelectItem value="ব্যাসিক কম্পিউটার">ব্যবসায়ী</SelectItem>
                                                        <SelectItem value="চাকুরীজীবী">চাকরিজীবী</SelectItem>
                                                        <SelectItem value="গৃহিণী">গৃহিণী</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="course"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">কোর্স নির্বাচন করুন *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-primary-200 focus:ring-primary-500 rounded-lg">
                                                            <SelectValue placeholder="কোর্স নির্বাচন করুন" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-lg">
                                                        <SelectItem value="গ্রাফিক্স ডিজাইন">গ্রাফিক্স ডিজাইন</SelectItem>
                                                        <SelectItem value="ব্যাসিক কম্পিউটার">ব্যাসিক কম্পিউটার</SelectItem>
                                                        <SelectItem value="ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট">ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* <FormField
                                        control={form.control}
                                        name="bloodGroup"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">রক্তের গ্রুপ</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="আপনার রক্তের গ্রুপ লিখুন"
                                                        {...field}
                                                        className="border-primary-200 focus-visible:ring-primary-200 rounded-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    /> */}
                                    <FormField
                                        control={form.control}
                                        name="bloodGroup"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">রক্তের গ্রুপ</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full border-primary-200 focus:ring-primary-500 rounded-lg">
                                                            <SelectValue placeholder="আপনার রক্তের গ্রুপ নির্বাচন করুন" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="rounded-lg">
                                                        <SelectItem value="এ পজিটিভ">এ পজিটিভ</SelectItem>
                                                        <SelectItem value="এ নেগেটিভ">এ নেগেটিভ</SelectItem>
                                                        <SelectItem value="বি পজিটিভ">বি পজিটিভ</SelectItem>
                                                        <SelectItem value="বি নেগেটিভ">বি নেগেটিভ</SelectItem>
                                                        <SelectItem value="এবি পজিটিভ">এবি পজিটিভ</SelectItem>
                                                        <SelectItem value="এবি নেগেটিভ">এবি নেগেটিভ</SelectItem>
                                                        <SelectItem value="ও পজিটিভ">ও পজিটিভ</SelectItem>
                                                        <SelectItem value="ও নেগেটিভ">ও নেগেটিভ</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-primary-600 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                                >
                                    {isSubmitting ? "অপেক্ষা করুন..." : "জমা দিন"}
                                    <ChevronRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center border-t bg-primary-50 p-6 text-center text-sm">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-primary-100 w-full max-w-md">
                        <p className="text-primary-700">📞 আপনার যে কোন জিজ্ঞাসায় হেল্প-লাইন  নাম্বার: 01715409109</p>
                    </div>
                </CardFooter>
            </Card>
            <CongratsModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                studentName={submittedName}
            />
            <ErrorModal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                onRetry={handleRetry}
                errorMessage={errorMessage}
            />
        </div>
    )
}
