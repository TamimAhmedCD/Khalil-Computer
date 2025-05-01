"use client"

import { ErrorState } from "@/components/ui/error-state"
import { FileQuestion } from "lucide-react"

export default function NotFoundPage() {
    return (
        <ErrorState
            icon={FileQuestion}
            title="পৃষ্ঠা পাওয়া যায়নি"
            description="দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি"
            alertTitle="সম্ভাব্য কারণ"
            alertDescription="এই URL ভুল হতে পারে অথবা পৃষ্ঠাটি সরানো হয়েছে। অনুগ্রহ করে URL টি পরীক্ষা করুন অথবা হোম পেজে ফিরে যান।"
            headerBgColor="bg-blue-50"
            iconBgColor="bg-blue-100/80"
            iconColor="text-blue-600"
            alertBgColor="bg-blue-50"
            alertTextColor="text-blue-700"
            alertTitleColor="text-blue-800"
        />
    )
}
