"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "../ui/button"

// FAQ data in Bengali
const faqData = [
    {
        id: "item-1",
        category: "courses",
        question: "আপনারা কি কি কোর্স অফার করেন?",
        answer:
            "আমরা বিভিন্ন ধরনের কম্পিউটার কোর্স অফার করি, যেমন ওয়েব ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডাটা সায়েন্স, সফটওয়্যার ডেভেলপমেন্ট, সাইবার সিকিউরিটি এবং আরও অনেক কিছু। আমাদের কোর্সগুলি বিভিন্ন স্তরের জন্য উপযুক্ত, শুরু থেকে উন্নত পর্যায় পর্যন্ত।",
    },
    {
        id: "item-2",
        category: "certificates",
        question: "আপনাদের কোর্স থেকে কি সার্টিফিকেট পাওয়া যায়?",
        answer:
            "হ্যাঁ, আমাদের সকল কোর্স সফলভাবে সম্পন্ন করার পর আপনি একটি অফিসিয়াল সার্টিফিকেট পাবেন। আমাদের সার্টিফিকেটগুলি শিল্প-স্বীকৃত এবং বিভিন্ন কোম্পানি ও প্রতিষ্ঠান দ্বারা মূল্যায়িত। এই সার্টিফিকেটগুলি আপনার রেজুমে যোগ করে আপনার কর্মজীবনের সম্ভাবনা বাড়াতে সাহায্য করবে।",
    },
    {
        id: "item-3",
        category: "support",
        question: "শিক্ষার্থীদের জন্য কি ধরনের সাপোর্ট প্রদান করা হয়?",
        answer:
            "আমরা আমাদের শিক্ষার্থীদের জন্য ২৪/৭ অনলাইন সাপোর্ট প্রদান করি। এছাড়াও, প্রতিটি কোর্সের জন্য একজন ডেডিকেটেড মেন্টর থাকে যিনি আপনার প্রশ্নের উত্তর দিতে এবং প্রজেক্ট সম্পর্কে গাইড করতে সাহায্য করবেন। আমরা নিয়মিত স্টাডি গ্রুপ এবং ওয়ার্কশপও আয়োজন করি যেখানে আপনি অন্যান্য শিক্ষার্থীদের সাথে যোগাযোগ করতে পারবেন।",
    },
    {
        id: "item-5",
        category: "support",
        question: "আমি ফ্রিল্যান্সিং করতে চাই, কোনো গাইডলাইন দিবেন?",
        answer:
            "অবশ্যই! আমরা ফ্রিল্যান্সিং শুরু করার জন্য আলাদা সাপোর্ট সেশন ও গাইডলাইন দিয়ে থাকি।",
    },
    {
        id: "item-4",
        category: "fees",
        question: "কোর্সের ফি কিভাবে পরিশোধ করা যায়?",
        answer:
            "আমরা বিভিন্ন পেমেন্ট অপশন অফার করি, যেমন বিকাশ, নগদ, রকেট, ক্রেডিট কার্ড, ডেবিট কার্ড এবং ব্যাংক ট্রান্সফার। এছাড়াও, আমরা কিস্তিতে পেমেন্টের সুবিধাও দিয়ে থাকি। আপনি আমাদের ওয়েবসাইটের মাধ্যমে অনলাইনে অথবা আমাদের অফিসে এসে সরাসরি পেমেন্ট করতে পারেন।",
    },
]

// Categories in Bengali
const categories = [
    { id: "all", label: "সব" },
    { id: "courses", label: "কোর্স" },
    { id: "certificates", label: "সার্টিফিকেট" },
    { id: "support", label: "সাপোর্ট" },
    { id: "fees", label: "ফি" },
]

export function BengaliFaqSection() {
    const [openItem, setOpenItem] = useState("item-1")
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")

    // Filter FAQs based on search query and active category
    const filteredFaqs = faqData.filter((faq) => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory
        return matchesSearch && matchesCategory
    })

    return (
        <section className="md:mt-10 mt-7">
            <div>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="inline-block rounded-lg bg-primary-200/70 px-3 py-1 text-sm text-primary-600 dark:bg-gray-800 dark:text-primary-400">
                        সাহায্য এবং সমর্থন
                    </div>
                    {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">সচরাচর জিজ্ঞাসা</h2>
                    <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        আমাদের কম্পিউটার ট্রেনিং সেন্টার সম্পর্কে সাধারণ প্রশ্নের উত্তর
                    </p> */}
                    {/* Heading */}
                    <div className="text-center lg:w-2/4 mx-auto">
                        <h1 className="font-hind-siliguri font-bold text-3xl md:text-4xl mb-4 text-gray-800">
                            সচরাচর <span className="text-primary-600">জিজ্ঞাসা</span>
                        </h1>
                        <p className="text-gray-600">
                            আমাদের কম্পিউটার ট্রেনিং সেন্টার সম্পর্কে সাধারণ প্রশ্নের উত্তর                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl mt-8 md:mt-10">
                    {/* Search bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="প্রশ্ন খুঁজুন..."
                            className="pl-10 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full transition-colors",
                                    activeCategory === category.id
                                        ? "bg-primary-500 text-white dark:bg-primary-600"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
                                )}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    {filteredFaqs.length > 0 ? (
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                value={openItem || undefined}
                                onValueChange={(value) => setOpenItem(value)}
                            >
                                {filteredFaqs.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={faq.id}
                                        className={cn(index !== filteredFaqs.length - 1 && "border-b border-gray-200 dark:border-gray-800")}
                                    >
                                        <AccordionTrigger className="text-left font-medium py-4 px-6 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
                                            <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                {faq.question}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 dark:text-gray-300 px-6 pb-6 pt-2 leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                            <p className="text-gray-500 dark:text-gray-400">কোন প্রশ্ন পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</p>
                        </div>
                    )}

                    {/* Additional help text */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">আপনার প্রশ্নের উত্তর খুঁজে না পেলে, আমাদের সাথে যোগাযোগ করুন</p>
                        <Link href="/contact-us"><Button className="bg-primary-600 hover:bg-primary-700 mt-3">যোগাযোগ করুন</Button></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
