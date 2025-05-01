"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { SocialLoginButtons } from "./SocialLoginButton"
import axios from "axios"
import { toast } from "sonner"

const signupFormSchema = z
    .object({
        name: z.string().min(2, {
            message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে",
        }),
        email: z.string().email({
            message: "সঠিক ইমেইল ঠিকানা দিন",
        }),
        password: z.string().min(8, {
            message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
        }),
        confirmPassword: z.string(),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "আপনাকে শর্তাবলী গ্রহণ করতে হবে",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "পাসওয়ার্ড মিলছে না",
        path: ["confirmPassword"],
    })




export function SignupForm({ onSwitchMode }) {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    })

    async function onSubmit(data) {
        setIsLoading(true);

        try {
            // Make the API request
            const response = await axios.post('/api/auth/signup', data);
            console.log(response.data);

            // Check if the response status is successful (201 Created)
            if (response.status === 201) {
                toast.success(response.data.message);  // Display success toast
                router.push("/auth");  // Redirect to the dashboard
            } else {
                // For 400, 500 errors, or any other status
                toast.error(response.data.message || 'একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।');
            }
        } catch (error) {
            console.error("Signup error:", error);

            // Handle different types of errors
            const errorMessage = error.response
                ? error.response.data.message
                : error.request
                    ? 'সার্ভার থেকে কোন উত্তর পাওয়া যায়নি। দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন বা পরে আবার চেষ্টা করুন।'
                    : 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। দয়া করে পরবর্তীতে আবার চেষ্টা করুন।';

            toast.error(errorMessage);

            form.setError("root", {
                message: errorMessage,
            });
        } finally {
            setIsLoading(false);  // Stop the loading spinner once the process is complete
        }
    }

    return (
        <div className="space-y-6 mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">নাম</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="আপনার পূর্ণ নাম"
                                        {...field}
                                        className="h-11 rounded-lg border-gray-200 bg-gray-50 focus-visible:ring-primary-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700">ইমেইল</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="আপনার ইমেইল ঠিকানা"
                                        {...field}
                                        className="h-11 rounded-lg border-gray-200 bg-gray-50 focus-visible:ring-primary-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">পাসওয়ার্ড</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="নতুন পাসওয়ার্ড"
                                                {...field}
                                                className="h-11 rounded-lg border-gray-200 bg-gray-50 pr-10 focus-visible:ring-primary-500"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-11 w-11 px-3 py-0 text-gray-400"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                                                {...field}
                                                className="h-11 rounded-lg border-gray-200 bg-gray-50 pr-10 focus-visible:ring-primary-500"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-11 w-11 px-3 py-0 text-gray-400"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="mt-1 data-[state=checked]:bg-primary-600 data-[state=checked]:text-primary-foreground"
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal text-gray-600">
                                        আমি{" "}
                                        <a href="#" className="text-primary-600 hover:underline">
                                            শর্তাবলী
                                        </a>{" "}
                                        এবং{" "}
                                        <a href="#" className="text-primary-600 hover:underline">
                                            গোপনীয়তা নীতি
                                        </a>{" "}
                                        পড়েছি এবং সম্মত আছি
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    {form.formState.errors.root && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-md bg-red-50 p-3 text-sm text-red-600"
                        >
                            {form.formState.errors.root.message}
                        </motion.div>
                    )}

                    <Button
                        type="submit"
                        className="h-11 w-full bg-primary-600 text-white hover:bg-primary-700"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> রেজিস্ট্রেশন হচ্ছে...
                            </>
                        ) : (
                            "রেজিস্ট্রেশন করুন"
                        )}
                    </Button>
                </form>
            </Form>

            <div className="relative flex items-center justify-center">
                <Separator className="absolute w-full" />
                <span className="relative bg-white px-2 text-xs text-gray-500">অথবা</span>
            </div>

            <SocialLoginButtons />

            <div className="text-center text-sm">
                <span className="text-gray-600">ইতিমধ্যে অ্যাকাউন্ট আছে? </span>
                <Button variant="link" className="h-auto p-0 text-primary-600 hover:text-primary-700" onClick={onSwitchMode}>
                    লগইন করুন
                </Button>
            </div>
        </div>
    )
}
