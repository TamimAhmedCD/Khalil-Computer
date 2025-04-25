"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, ChevronRightIcon, InfoIcon, Pencil, BookOpen, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { CongratsModal } from "./CongratsModal"

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
    permanentAddress: z.string().min(5, {
        message: "স্থায়ী ঠিকানা অবশ্যই দিতে হবে",
    }),
    studentMobile: z.string().min(11, {
        message: "সঠিক মোবাইল নম্বর দিন",
    }),
    guardianMobile: z.string().min(11, {
        message: "সঠিক মোবাইল নম্বর দিন",
    }),
    email: z.string().email({
        message: "সঠিক ইমেইল ঠিকানা দিন",
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
    bloodGroup: z.string().min(1, {
        message: "রক্তের গ্রুপ অবশ্যই দিতে হবে",
    }),
})

export function RegistrationForm() {
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [submittedName, setSubmittedName] = useState("")

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

    function onSubmit(values) {
        console.log(values)
        setSubmittedName(values.studentName)
        setShowSuccessModal(true)
    }

    return (
        <div className="space-y-8 mt-5">
            <Card className="border-none bg-primary-100/5s overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                <CardHeader className="space-y-1 pb-6">
                    <div className="flex justify-center mb-2">
                        <div className="bg-primary-500 text-white p-3 rounded-full">
                            <Pencil className="h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-center text-primary-700">
                        প্রশিক্ষণার্থী নিবন্ধন ফর্ম
                    </CardTitle>
                    <CardDescription className="text-base text-center">
                        অনুগ্রহ করে নিচের ফর্মটি সঠিকভাবে পূরণ করুন। সকল তথ্য অবশ্যই সত্য ও সঠিক প্রদান করতে হবে।
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

                                    <FormField
                                        control={form.control}
                                        name="birthDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="text-primary-700 font-medium">জন্ম তারিখ *</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal border-primary-200 rounded-lg",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                {field.value ? format(field.value, "PPP") : <span>তারিখ নির্বাচন করুন</span>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                            className="rounded-lg border-primary-200"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
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
                                                <FormLabel className="text-primary-700 font-medium">স্থায়ী ঠিকানা *</FormLabel>
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
                                                <FormLabel className="text-primary-700 font-medium">অভিভাবকের মোবাইল নম্বর *</FormLabel>
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
                                            <FormLabel className="text-primary-700 font-medium">শিক্ষার্থীর ইমেইল ঠিকানা *</FormLabel>
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
                                                <FormControl>
                                                    <Input
                                                        placeholder="শিক্ষাগত যোগ্যতা লিখুন"
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
                                        name="occupation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">পেশা *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="আপনার পেশা লিখুন"
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
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bloodGroup"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-primary-700 font-medium">রক্তের গ্রুপ *</FormLabel>
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
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
                                >
                                    জমা দিন
                                    <ChevronRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center border-t bg-primary-50 p-6 text-center text-sm">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-primary-100 w-full max-w-md">
                        <p className="text-primary-700">ফর্ম সম্পর্কে কোন প্রশ্ন থাকলে যোগাযোগ করুন: ০১৭১৫৪০৯১০৯</p>
                    </div>
                </CardFooter>
            </Card>
            <CongratsModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                studentName={submittedName}
            />
        </div>
    )
}
