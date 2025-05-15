"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronRightIcon, X } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import axios from "axios";

const formSchema = z.object({
    studentName: z.string().min(2, {
        message: "নাম অবশ্যই দিতে হবে",
    }),
    studentMobile: z.string().min(11, {
        message: "সঠিক মোবাইল নম্বর দিন",
    }),
    location: z.string().optional(),
    occupation: z.string().optional(),
    course: z.string().min(2, {
        message: "কোর্স অবশ্যই দিতে হবে",
    }),
});

const coursePrices = {
    "বেসিক কম্পিউটার": 1500,
    "গ্রাফিক্স ডিজাইন": 3000,
    "ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট": 5000,
};

export function Admission({ triggerElements }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedCoursePrice, setSelectedCoursePrice] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentName: "",
            studentMobile: "",
            location: "",
            occupation: "",
            course: "",
        },
    });

    async function onSubmit(data) {
        setIsSubmitting(true);

        try {
            // Simulate API call
            const sendEmail = await axios.post("/api/mail/admission", data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Form data:", data);
            setIsSuccess(true);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog className="">
            <DialogTrigger asChild>
                {triggerElements}
            </DialogTrigger>
            <DialogContent className="w-full max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex justify-center mb-2">
                        <div className="bg-primary-500 text-white p-3 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </div>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-primary-700 text-center">
                        এখনই ভর্তির জন্য আবেদন করুন
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        নিচের ফর্মটি পূরণ করে সাবমিট করুন, আমাদের প্রতিনিধি অতি শীঘ্রই ‍আপনার সাথে যোগাযোগ করবে
                    </DialogDescription>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-primary-100 w-full max-w-md text-center">
                        <p className="text-primary-700">
                            📞 যোগাযোগ করুন: 01715409109
                        </p>
                    </div>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-6 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary-600 h-8 w-8"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-primary-700">
                            ধন্যবাদ! আপনার নিবন্ধন সফল হয়েছে
                        </h3>
                        <DialogClose>
                            <Button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white">
                                বন্ধ করুন
                            </Button>
                        </DialogClose>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                            <FormField
                                control={form.control}
                                name="studentName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary-700 font-medium">
                                            আপনার নাম *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="পূর্ণ নাম লিখুন"
                                                {...field}
                                                className="border-primary-200 focus-visible:ring-primary-300 rounded-lg"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="studentMobile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary-700 font-medium">
                                            মোবাইল নম্বর *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="০১XXXXXXXXX"
                                                {...field}
                                                className="border-primary-200 focus-visible:ring-primary-300 rounded-lg"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary-700 font-medium">
                                            ঠিকানা
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="আপনার ঠিকানা লিখুন" {...field} />
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
                                        <FormLabel className="text-primary-700 font-medium">
                                            পেশা
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full border-primary-200 focus:ring-primary-300 rounded-lg">
                                                    <SelectValue placeholder="আপনার পেশা নির্বাচন করুন" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-lg">
                                                <SelectItem value="ছাত্র/ছাত্রী">
                                                    ছাত্র/ছাত্রী
                                                </SelectItem>
                                                <SelectItem value="চাকরিজীবী">চাকরিজীবী</SelectItem>
                                                <SelectItem value="ব্যবসায়ী">ব্যবসায়ী</SelectItem>
                                                <SelectItem value="গৃহিণী">গৃহিণী</SelectItem>
                                                <SelectItem value="প্রবাসী">প্রবাসী</SelectItem>
                                                <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="course"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary-700 font-medium">
                                            কোর্স নির্বাচন করুন *
                                        </FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setSelectedCoursePrice(coursePrices[value] || null);
                                            }}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full border-primary-200 focus:ring-primary-300 rounded-lg">
                                                    <SelectValue placeholder="কোর্স নির্বাচন করুন" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-lg">
                                                <SelectItem value="বেসিক কম্পিউটার">বেসিক কম্পিউটার</SelectItem>
                                                <SelectItem value="গ্রাফিক্স ডিজাইন">গ্রাফিক্স ডিজাইন</SelectItem>
                                                <SelectItem value="ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট">ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-500" />
                                        {selectedCoursePrice && (
                                            <p className="text-primary-600 font-semibold text-center mt-2">
                                                নির্ধারিত কোর্স ফি: {selectedCoursePrice} টাকা
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="mt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-full shadow-md transition-all duration-300 hover:scale-105 flex items-center gap-2 w-full"
                                >
                                    {isSubmitting ? "অপেক্ষা করুন..." : "জমা দিন"}
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
