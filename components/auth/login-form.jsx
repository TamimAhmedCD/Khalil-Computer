"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SocialLoginButtons } from "./SocialLoginButton";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/login";
import { useSession } from "next-auth/react";

const loginFormSchema = z.object({
    email: z.string().email({
        message: "সঠিক ইমেইল ঠিকানা দিন",
    }),
    password: z.string().min(6, {
        message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
    }),
    rememberMe: z.boolean().optional(),
});

export function LoginForm({ onSwitchMode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const result = await loginAction(data.email, data.password);

            if (result?.success) {
                toast.success("লগইন সফলভাবে সম্পন্ন হয়েছে!");

                // Refresh session
                router.refresh();

                // Wait a moment for the session to update, then fetch it and route
                setTimeout(async () => {
                    const { data: session } = await useSession(); // Custom fetch or call /api/session
                    if (session?.user?.role === "admin") {
                        router.push("/admin/dashboard");
                    } else if (session?.user?.role === "student") {
                        router.push("/student/dashboard");
                    } else {
                        router.push("/");
                    }
                }, 300); // Delay helps ensure session updates
            } else {
                toast.error(result.error || "লগইন করতে ব্যর্থ হয়েছে");
            }
        } catch (error) {
            toast.error("লগইন প্রক্রিয়ায় সমস্যা হয়েছে");
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-gray-700">পাসওয়ার্ড</FormLabel>
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-xs font-normal text-primary-600"
                                        type="button"
                                        onClick={() => router.push("/auth/forgot-password")}
                                    >
                                        পাসওয়ার্ড ভুলে গেছেন?
                                    </Button>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="আপনার পাসওয়ার্ড"
                                            {...field}
                                            className="h-11 rounded-lg border-gray-200 bg-gray-50 pr-10 focus-visible:ring-primary-500"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-11 w-11 px-3 py-0 text-gray-400"
                                            onClick={togglePasswordVisibility}
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
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-primary-600 data-[state=checked]:text-primary-foreground"
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-gray-600">আমাকে মনে রাখুন</FormLabel>
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
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> লগইন হচ্ছে...
                            </>
                        ) : (
                            "লগইন করুন"
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
                <span className="text-gray-600">অ্যাকাউন্ট নেই? </span>
                <Button variant="link" className="h-auto p-0 text-primary-600 hover:text-primary-700" onClick={onSwitchMode}>
                    রেজিস্ট্রেশন করুন
                </Button>
            </div>
        </div>
    );
}
