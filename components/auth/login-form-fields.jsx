"use client";

import { useRouter } from "next/navigation";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { PasswordField } from "./password-field";
import { Checkbox } from "../ui/checkbox";

export function LoginFormFields({ form, isLoading }) {
    const router = useRouter();

    return (
        <>
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
                                className="h-11 rounded-lg border-gray-200 bg-gray-50"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <PasswordField control={form.control} router={router} />

            <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-primary-600"
                            />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-gray-600">আমাকে মনে রাখুন</FormLabel>
                    </FormItem>
                )}
            />
        </>
    );
}
