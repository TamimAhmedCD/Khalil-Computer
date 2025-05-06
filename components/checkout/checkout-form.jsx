"use client"

import Link from "next/link"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreditCard, Landmark, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "নাম অবশ্যই ২ অক্ষরের বেশি হতে হবে",
    }),
    email: z.string().email({
        message: "সঠিক ইমেইল ঠিকানা দিন",
    }),
    phone: z.string().min(11, {
        message: "সঠিক মোবাইল নম্বর দিন",
    }),
    address: z.string().optional(),
    paymentMethod: z.enum(["card", "bank", "mobile"]),
    mobileBankingSystem: z.string().optional(),
    transactionId: z.string().optional(),
    paymentNumber: z.string().optional(),
    bankName: z.string().optional(),
    cardType: z.string().optional(),
    agreeToTerms: z.literal(true, {
        errorMap: () => ({ message: "আপনাকে শর্তাবলী মেনে নিতে হবে" }),
    }),
})

// Payment method information
const paymentInfo = {
    mobile: {
        bkash: {
            number: "01715409109",
            type: "পার্সোনাল",
            instructions: [
                "আপনার বিকাশ অ্যাপ ওপেন করুন",
                "সেন্ড মানি অপশন সিলেক্ট করুন",
                "পার্সোনাল নাম্বার 01715409109 দিন",
                "আপনার কোর্সের মূল্য টাকা দিন",
                "রেফারেন্স এ আপনার নাম লিখুন",
                "আপনার বিকাশ পিন দিয়ে সেন্ড মানি কনফার্ম করুন",
            ],
        },
        nagad: {
            number: "01715409109",
            type: "পার্সোনাল",
            instructions: [
                "আপনার নগদ অ্যাপ ওপেন করুন",
                "পার্সোনাল পে সিলেক্ট করুন",
                "পার্সোনাল নাম্বার 01715409109 দিন",
                "আপনার কোর্সের মূল্য টাকা দিন",
                "রেফারেন্স এ আপনার নাম লিখুন",
                "আপনার নগদ পিন দিয়ে পেমেন্ট কনফার্ম করুন",
            ],
        },
        rocket: {
            number: "01715409109",
            type: "পার্সোনাল",
            instructions: [
                "আপনার ফোনে *322# ডায়াল করুন",
                "1 চেপে পেমেন্ট সিলেক্ট করুন",
                "পার্সোনাল নাম্বার 01715409109 দিন",
                "আপনার কোর্সের মূল্য টাকা দিন",
                "রেফারেন্স এ আপনার নাম লিখুন",
                "আপনার রকেট পিন দিয়ে পেমেন্ট কনফার্ম করুন",
            ],
        },
    },
    bank: {
        instructions: [
            "নিচের ব্যাংক অ্যাকাউন্টে টাকা ট্রান্সফার করুন",
            "ব্যাংকের নাম: ডাচ-বাংলা ব্যাংক লিমিটেড",
            "অ্যাকাউন্ট নাম: কোর্স প্লাটফর্ম",
            "অ্যাকাউন্ট নম্বর: 123456789",
            "ব্রাঞ্চ: গুলশান, ঢাকা",
            "ট্রান্সফার করার পর ট্রানজেকশন আইডি নিচে লিখুন",
        ],
    },
    card: {
        instructions: [
            "আমরা বর্তমানে নিম্নলিখিত কার্ড গ্রহণ করি:",
            "VISA",
            "MasterCard",
            "American Express",
            "নিচে আপনার কার্ডের ধরন সিলেক্ট করুন",
        ],
    },
}

export function CheckoutForm({ session, status }) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: session?.user?.name,
            email: session?.user?.email,
            phone: "",
            address: "",
            paymentMethod: "mobile",
            mobileBankingSystem: "",
            transactionId: "",
            paymentNumber: "",
            bankName: "",
            cardType: "",
            agreeToTerms: false,
        },
    })

    const watchPaymentMethod = form.watch("paymentMethod")
    const watchMobileBankingSystem = form.watch("mobileBankingSystem")

    function onSubmit(values) {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log(values)
            setIsSubmitting(false)
            // Here you would typically redirect to a success page or show a success message
        }, 1500)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">আপনার তথ্য</h3>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>পূর্ণ নাম</FormLabel>
                                <FormControl>
                                    <Input placeholder="আপনার নাম লিখুন" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ইমেইল</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@mail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>মোবাইল নম্বর</FormLabel>
                                    <FormControl>
                                        <Input placeholder="01XXXXXXXXX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ঠিকানা (ঐচ্ছিক)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="আপনার ঠিকানা লিখুন" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">পেমেন্ট পদ্ধতি</h3>

                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="mobile" />
                                            </FormControl>
                                            <FormLabel className="font-normal flex items-center">
                                                <Smartphone className="h-4 w-4 mr-2" />
                                                মোবাইল ব্যাংকিং (বিকাশ/নগদ/রকেট)
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="card" />
                                            </FormControl>
                                            <FormLabel className="font-normal flex items-center">
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                ক্রেডিট/ডেবিট কার্ড
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="bank" />
                                            </FormControl>
                                            <FormLabel className="font-normal flex items-center">
                                                <Landmark className="h-4 w-4 mr-2" />
                                                ব্যাংক ট্রান্সফার
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Dynamic payment instructions based on selected payment method */}
                {watchPaymentMethod === "mobile" && (
                    <Card className="border-dashed">
                        <CardContent className="pt-6">
                            <FormField
                                control={form.control}
                                name="mobileBankingSystem"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>মোবাইল ব্যাংকিং সিস্টেম নির্বাচন করুন</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="মোবাইল ব্যাংকিং সিস্টেম নির্বাচন করুন" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="bkash">বিকাশ</SelectItem>
                                                <SelectItem value="nagad">নগদ</SelectItem>
                                                <SelectItem value="rocket">রকেট</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {watchMobileBankingSystem && (
                                <div className="space-y-4">
                                    <div className="bg-muted p-4 rounded-md space-y-2">
                                        <p className="font-medium">পেমেন্ট নির্দেশনা:</p>
                                        <p className="text-sm">
                                            {watchMobileBankingSystem === "bkash" && "বিকাশ"}
                                            {watchMobileBankingSystem === "nagad" && "নগদ"}
                                            {watchMobileBankingSystem === "rocket" && "রকেট"}{" "}
                                            {paymentInfo.mobile[watchMobileBankingSystem].type} নাম্বার:{" "}
                                            <span className="font-bold">
                                                {paymentInfo.mobile[watchMobileBankingSystem].number}
                                            </span>
                                        </p>
                                        <ul className="text-sm list-disc pl-5 space-y-1">
                                            {paymentInfo.mobile[watchMobileBankingSystem].instructions.map(
                                                (instruction, index) => (
                                                    <li key={index}>{instruction}</li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="transactionId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ট্রানজেকশন আইডি</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="ট্রানজেকশন আইডি লিখুন" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="paymentNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>যে নাম্বার থেকে পেমেন্ট করা হয়েছে</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="01XXXXXXXXX" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {watchPaymentMethod === "bank" && (
                    <Card className="border-dashed">
                        <CardContent className="pt-6">
                            <div className="bg-muted p-4 rounded-md space-y-2 mb-4">
                                <p className="font-medium">ব্যাংক ট্রান্সফার নির্দেশনা:</p>
                                <ul className="text-sm list-disc pl-5 space-y-1">
                                    {paymentInfo.bank.instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ul>
                            </div>

                            <FormField
                                control={form.control}
                                name="bankName"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>ব্যাংকের নাম</FormLabel>
                                        <FormControl>
                                            <Input placeholder="যে ব্যাংক থেকে ট্রান্সফার করেছেন" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="transactionId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ট্রানজেকশন আইডি/রেফারেন্স</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ট্রানজেকশন আইডি লিখুন" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                )}

                {watchPaymentMethod === "card" && (
                    <Card className="border-dashed">
                        <CardContent className="pt-6">
                            <div className="bg-muted p-4 rounded-md space-y-2 mb-4">
                                <p className="font-medium">কার্ড পেমেন্ট নির্দেশনা:</p>
                                <ul className="text-sm list-disc pl-5 space-y-1">
                                    {paymentInfo.card.instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ul>
                            </div>

                            <FormField
                                control={form.control}
                                name="cardType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>কার্ডের ধরন</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="কার্ডের ধরন নির্বাচন করুন" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="visa">VISA</SelectItem>
                                                <SelectItem value="mastercard">MasterCard</SelectItem>
                                                <SelectItem value="amex">American Express</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <p className="text-sm text-muted-foreground mt-4">
                                "পেমেন্ট সম্পন্ন করুন" বাটনে ক্লিক করার পর আপনি সুরক্ষিত পেমেন্ট গেটওয়েতে রিডাইরেক্ট হবেন।
                            </p>
                        </CardContent>
                    </Card>
                )}

                <Separator />

                <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    আমি{" "}
                                    <Link href="/terms" className="text-primary underline">
                                        শর্তাবলী
                                    </Link>{" "}
                                    এবং{" "}
                                    <Link href="/privacy" className="text-primary underline">
                                        গোপনীয়তা নীতি
                                    </Link>{" "}
                                    পড়েছি এবং সম্মত আছি
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "প্রক্রিয়াকরণ হচ্ছে..." : "পেমেন্ট সম্পন্ন করুন"}
                </Button>
            </form>
        </Form>
    )
}
