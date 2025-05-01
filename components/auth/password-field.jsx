"use client";

import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField({ control, router }) {
    const [showPassword, setShowPassword] = useState(false);
    const toggleVisibility = () => setShowPassword((prev) => !prev);

    return (
        <FormField
            control={control}
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
                                className="h-11 rounded-lg border-gray-200 bg-gray-50 pr-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-11 w-11 px-3 py-0 text-gray-400"
                                onClick={toggleVisibility}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
