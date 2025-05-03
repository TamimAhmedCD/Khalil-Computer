"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const categories = [
    { value: "IT & Computer Skills", label: "IT & Computer Skills" },
    { value: "design", label: "ডিজাইন" },
    { value: "business", label: "ব্যবসা" },
    { value: "marketing", label: "মার্কেটিং" },
    { value: "language", label: "ভাষা" },
    { value: "academic", label: "একাডেমিক" },
]

export function BasicInfoForm() {
    const { control, setValue, watch } = useFormContext()
    const [tagInput, setTagInput] = useState("")
    const tags = watch("tags") || []

    const handleAddTag = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            const newTag = tagInput.trim()

            if (newTag && !tags.includes(newTag)) {
                setValue("tags", [...tags, newTag])
            }

            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setValue(
            "tags",
            tags.filter((tag) => tag !== tagToRemove),
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
            <FormField
                control={control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            কোর্সের শিরোনাম <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="কোর্সের শিরোনাম লিখুন" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            কোর্স ক্যাটাগরি <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            কোর্সের বর্ণনা <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <Textarea placeholder="কোর্সের সংক্ষিপ্ত বর্ণনা লিখুন" className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="space-y-2">
                <Label htmlFor="tags">ট্যাগ সমূহ <span className="text-red-500">*</span></Label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-1 text-sm">
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="ml-1 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
                <Input
                    id="tagInput"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="ট্যাগ লিখুন এবং এন্টার চাপুন"
                />
                <p className="text-xs text-muted-foreground mt-1">ট্যাগ যুক্ত করতে এন্টার বা কমা (,) চাপুন</p>
            </div>
        </motion.div>
    )
}
