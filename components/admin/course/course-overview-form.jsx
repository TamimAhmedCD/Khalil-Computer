"use client"

import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Editor } from "@tinymce/tinymce-react"

export function CourseOverviewForm() {
    const { control, setValue, watch } = useFormContext()
    const [isDragging, setIsDragging] = useState(false)
    const courseImagePreview = watch("courseImagePreview")
    const fileInputRef = useRef(null)
    const editorRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue("courseThumbnail", file)
            const reader = new FileReader()
            reader.onload = (event) => {
                setValue("courseImagePreview", event.target?.result)
            }
            reader.readAsDataURL(file)
        }

        // Reset the input value so it can re-upload the same file
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }


    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith("image/")) {
            setValue("courseThumbnail", file)
            const reader = new FileReader()
            reader.onload = (event) => {
                const result = event.target?.result
                setValue("courseImagePreview", result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setValue("courseThumbnail", null)
        setValue("courseImagePreview", "")
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
            <FormField
                control={control}
                name="fullDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            সম্পূর্ণ বিবরণ লিখুন <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
                                onInit={(_evt, editor) => editorRef.current = editor}
                                value={field.value}
                                onEditorChange={(content) => field.onChange(content)}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="whatInside"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            এই কোর্সে যা থাকছে <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
                                onInit={(_evt, editor) => editorRef.current = editor}
                                value={field.value}
                                onEditorChange={(content) => field.onChange(content)}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="courseImagePreview"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>কোর্স ইমেজ আপলোড করুন</FormLabel>
                        <FormControl>
                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                                    courseImagePreview ? "p-2" : "p-10",
                                )}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById("courseThumbnail")?.click()}
                            >
                                {courseImagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={courseImagePreview || "/placeholder.svg"}
                                            alt="Course preview"
                                            width={500}
                                            height={300}
                                            className="h-auto max-h-[300px] object-cover rounded-md block mx-auto"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                removeImage()
                                            }}
                                            className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                                        <p className="text-lg font-medium">ইমেজ আপলোড করুন</p>
                                        <p className="text-sm text-muted-foreground mt-1">ড্র্যাগ করে ছাড়ুন অথবা ক্লিক করুন</p>
                                        <p className="text-xs text-muted-foreground mt-2">সর্বোচ্চ 5MB, JPG, PNG বা WebP ফরম্যাট</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="courseThumbnail"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </motion.div>
    )
}
