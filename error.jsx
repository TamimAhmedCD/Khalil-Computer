"use client"

import { AlertTriangle } from "lucide-react"
import { ErrorState } from "./components/ui/error-state"

export default function ErrorPage() {
    return (
        <ErrorState
            icon={AlertTriangle}
            title="একটি ত্রুটি ঘটেছে"
            description="দুঃখিত, একটি অপ্রত্যাশিত ত্রুটি ঘটেছে"
            alertTitle="সমস্যা সমাধানের চেষ্টা করুন"
            alertDescription="পৃষ্ঠাটি রিফ্রেশ করে দেখুন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন। সমস্যা চলতে থাকলে অনুগ্রহ করে প্রশাসকের সাথে যোগাযোগ করুন।"
            primaryActionLabel="পৃষ্ঠা রিফ্রেশ করুন"
            primaryActionHref="#"
            secondaryActionLabel="সাহায্য পান"
            secondaryActionHref="/help"
            headerBgColor="bg-orange-50"
            iconBgColor="bg-orange-100/80"
            iconColor="text-orange-600"
            alertBgColor="bg-orange-50"
            alertTextColor="text-orange-700"
            alertTitleColor="text-orange-800"
        />
    )
}
