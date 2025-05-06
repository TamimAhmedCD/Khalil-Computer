"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useSession } from "next-auth/react"

export function PricingMoreForm() {
    const { control, setValue, watch } = useFormContext()
    const isPaid = watch("isPaid")
    const { data: session } = useSession()

    // Reset price to 0 when switching to free
    useEffect(() => {
        if (!isPaid) {
            setValue("price", 0)
        }
    }, [isPaid, setValue])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="space-y-4">
                <FormField
                    control={control}
                    name="isPaid"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">মূল্য নির্ধারণ করুন</FormLabel>
                            </div>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <span className={!field.value ? "font-medium" : "text-muted-foreground"}>ফ্রি</span>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    <span className={field.value ? "font-medium" : "text-muted-foreground"}>পেইড</span>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {isPaid && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormField
                        control={control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>কোর্সের মূল্য (টাকা)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        min={0}
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /><FormField
                            control={control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ডিসকাউন্ট (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            min={0}
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /></div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="batchInfo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ব্যাচ তথ্য (ঐচ্ছিক)</FormLabel>
                            <FormControl>
                                <Input placeholder="উদাহরণ: ব্যাচ ১২" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="classTiming"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ক্লাস টাইমিং</FormLabel>
                            <FormControl>
                                <Input placeholder="উদাহরণ: সপ্তাহে ৩ দিন, বিকাল ৪টা" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="totalClasses"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>মোট ক্লাস সংখ্যা</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="courseDuration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>কোর্সের সময়কাল</FormLabel>
                            <FormControl>
                                <Input placeholder="উদাহরণ: ৩ মাস" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name="instructorName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>ইনস্ট্রাক্টরের নাম</FormLabel>
                        <FormControl>
                            <Input placeholder="ইনস্ট্রাক্টরের নাম লিখুন" {...field} defaultValue={session.user.name} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="supportInfo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>সাপোর্ট সম্পর্কিত তথ্য</FormLabel>
                        <FormControl>
                            <Textarea placeholder="কোর্স সাপোর্ট সম্পর্কিত তথ্য লিখুন" className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </motion.div>
    )
}
