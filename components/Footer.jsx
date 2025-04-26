'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Heart,
    Home,
    BookOpen,
    Users,
    Info,
    MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { toast } from "sonner"

export function Footer() {

    const handleSubscribe = (e) => {
        e.preventDefault()
        toast("ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।")
    }

    const currentYear = new Date().getFullYear()

    // Simplified navigation links with icons
    const navLinks = [
        { name: "হোম", href: "/", icon: Home },
        { name: "কোর্স", href: "#", icon: BookOpen },
        { name: "শিক্ষার্থী", href: "/student-list", icon: Users },
        { name: "আমাদের সম্পর্কে", href: "#", icon: Info },
        { name: "যোগাযোগ", href: "#", icon: MessageCircle },
    ]

    return (
        <footer className="pt-20 pb-8 relative overflow-hidden bg-primary-100/80 mt-10 md:mt-20 font-hind-siliguri">
            <div className="container mx-auto px-5 md:px-10 lg:px-20">
                {/* Top section with logo and newsletter - redesigned for minimal elegance */}
                <div className="mb-16 relative">
                    {/* Decorative elements */}

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Logo */}
                        <Image
                            src="/logo.png"
                            width={130}
                            height={160}
                            alt="Khalil Computer Logo"
                            title="Khalil Computer"
                            priority
                            className="w-32 lg:w-36 h-auto"
                        />

                        {/* Tagline */}
                        <p className="mt-4 max-w-md text-gray-600 text-center">
                            আমাদের প্রশিক্ষণ কেন্দ্র দক্ষতা উন্নয়ন এবং ক্যারিয়ার গঠনে সহায়তা করে।
                        </p>

                        {/* Newsletter */}
                        <div className="mt-8 w-full max-w-md">
                            <form onSubmit={handleSubscribe} className="relative">
                                <div className="relative overflow-hidden rounded-full border border-gray-200 bg-white p-1 shadow-sm transition-all focus-within:shadow-md">
                                    <Input
                                        type="email"
                                        placeholder="আপনার ইমেইল দিয়ে সাবস্ক্রাইব করুন"
                                        className="border-0 bg-transparent pl-4 pr-32 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 rounded-full bg-primary-600 px-4 hover:bg-primary-700"
                                    >
                                        সাবস্ক্রাইব
                                    </Button>

                                </div>
                            </form>
                            {/* {subscribed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 rounded-md bg-green-50 p-2 text-center text-sm text-green-600"
                                >
                                    ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।
                                </motion.div>
                            )} */}
                        </div>

                        {/* Social links */}
                        <div className="mt-8 flex justify-center space-x-4">
                            {[
                                { icon: Facebook, href: "https://facebook.com" },
                                { icon: Twitter, href: "https://twitter.com" },
                                { icon: Instagram, href: "https://instagram.com" },
                                { icon: Youtube, href: "https://youtube.com" },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all hover:bg-primary-600 hover:text-white hover:shadow-md"
                                    whileHover={{ y: -3 }}
                                >
                                    <social.icon size={18} className="transition-transform group-hover:scale-110" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Contact information in a single row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center p-4 rounded-xl bg-white shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                            <Phone size={18} />
                        </div>
                        <div className="ml-3">
                            <h4 className="text-xs font-medium text-gray-500">ফোন</h4>
                            <p className="text-sm font-medium text-gray-800">01715409109</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-xl bg-white shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                            <Mail size={18} />
                        </div>
                        <div className="ml-3">
                            <h4 className="text-xs font-medium text-gray-500">ইমেইল</h4>
                            <p className="text-sm font-medium text-gray-800">khalilcomputer@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-xl bg-white shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                            <MapPin size={18} />
                        </div>
                        <div className="ml-3">
                            <h4 className="text-xs font-medium text-gray-500">ঠিকানা</h4>
                            <p className="text-sm font-medium text-gray-800">মুক্তিযোদ্ধা কমপ্লেক্স, বড়লেখা, মৌলভীবাজার।</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-6 bg-gray-200" />

                {/* Bottom section with copyright */}
                <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                    <p className="text-sm text-gray-600">&copy; {currentYear} খলিল কম্পিউটার । সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex items-center text-sm text-gray-600">
                        <span>
                            <span className="mr-1">দ্বারা নির্মিত</span>
                            <Heart size={14} className="inline text-red-500 mx-1" />
                            <a href="https://portfolio-tamim.vercel.app" target="_blank" className="font-medium text-primary-600">Tamim Ahmed</a>
                        </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                        <Link href="#" className="hover:text-primary-600 transition-colors">
                            গোপনীয়তা নীতি
                        </Link>
                        <Link href="#" className="hover:text-primary-600 transition-colors">
                            শর্তাবলী
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
