"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/login";
import { LoginFormFields } from "./login-form-fields";
import { SocialLoginButtons } from "./SocialLoginButton";

const loginFormSchema = z.object({
    email: z.string().email({ message: "সঠিক ইমেইল ঠিকানা দিন" }),
    password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" }),
    rememberMe: z.boolean().optional(),
});

export function LoginForm({ onSwitchMode }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Initialize form with validation schema
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // Call the login action
            const result = await loginAction(data.email, data.password);

            if (result?.success) {
                // Wait for 300ms before showing the success toast
                setTimeout(() => {
                    toast.success("লগইন সফল হয়েছে!");
                }, 500);
                router.push('/')
                window.location.reload()
            } else {
                toast.error(result.error || "লগইন করতে ব্যর্থ হয়েছে");
            }
        } catch {
            toast.error("লগইন প্রক্রিয়ায় সমস্যা হয়েছে");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Reusable Login form fields */}
                    <LoginFormFields form={form} isLoading={isLoading} />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="h-11 w-full bg-primary-600 text-white hover:bg-primary-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
                    </Button>
                </form>
            </Form>

            {/* Separator */}
            <div className="relative flex items-center justify-center">
                <Separator className="absolute w-full" />
                <span className="relative bg-white px-2 text-xs text-gray-500">অথবা</span>
            </div>

            {/* Social login buttons */}
            <SocialLoginButtons />

            {/* Registration link */}
            <div className="text-center text-sm">
                <span className="text-gray-600">অ্যাকাউন্ট নেই? </span>
                <Button
                    variant="link"
                    className="p-0 text-primary-600"
                    onClick={onSwitchMode} // Switch to registration page
                >
                    রেজিস্ট্রেশন করুন
                </Button>
            </div>
        </div>
    );
}
