"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"

export function PricingMoreForm() {
    const { control, setValue, watch } = useFormContext()
    const isPaid = watch("isPaid")
    const { data: session } = useSession()

    // Reset price to 5000 when switching to free (more sensible default)
    React.useEffect(() => {
        if (!isPaid) {
            setValue("price", 5000)
        }
    }, [isPaid, setValue])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Pricing Section */}
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Course Pricing</Label>
                                <p className="text-xs text-muted-foreground">Select if this course is free or paid</p>
                            </div>
                            <FormField
                                control={control}
                                name="isPaid"
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <span className={!field.value ? "font-medium" : "text-muted-foreground text-sm"}>Free</span>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        <span className={field.value ? "font-medium" : "text-muted-foreground text-sm"}>Paid</span>
                                    </div>
                                )}
                            />
                        </div>

                        {isPaid && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <FormField
                                    control={control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Price (BDT)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="5000"
                                                    min={0}
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
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount (%)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="10"
                                                    min={0}
                                                    max={100}
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Course Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="batchInfo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Batch Info</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Batch 12, Morning Batch" {...field} />
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
                            <FormLabel>Class Timing</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 3 days/week, 4:00 PM" {...field} />
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
                            <FormLabel>Total Classes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder="12"
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
                            <FormLabel>Course Duration</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 3 months, 6 months" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Instructor & Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="instructorName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructor Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter instructor name"
                                    {...field}
                                    defaultValue={session?.user?.name || ""}
                                />
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
                            <FormLabel>Support Information</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Course support details, contact info, etc."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </motion.div>
    )
}
