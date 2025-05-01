"use client"

import { ErrorState } from "@/components/ui/error-state"
import { AlertCircle, ShieldOff } from "lucide-react"

export default function UnauthorizedPage() {
    return (
        <ErrorState
            icon={ShieldOff}
            title="অননুমোদিত অ্যাক্সেস"
            description="দুঃখিত, আপনার এই পৃষ্ঠা দেখার অনুমতি নেই"
            alertTitle="অ্যাক্সেস প্রয়োজন"
            alertDescription="এই পৃষ্ঠা দেখার জন্য আপনার উপযুক্ত অনুমতি নেই। আপনি যদি মনে করেন এটি একটি ত্রুটি, তাহলে অনুগ্রহ করে প্রশাসকের সাথে যোগাযোগ করুন।"
        >
            <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">অ্যাক্সেস প্রয়োজন</h3>
                <div className="mt-2 text-sm text-amber-700">
                    <p>
                        এই পৃষ্ঠা দেখার জন্য আপনার উপযুক্ত অনুমতি নেই। আপনি যদি মনে করেন এটি একটি ত্রুটি, তাহলে অনুগ্রহ করে প্রশাসকের সাথে যোগাযোগ
                        করুন।
                    </p>
                </div>
            </div>
        </ErrorState>
    )
}
