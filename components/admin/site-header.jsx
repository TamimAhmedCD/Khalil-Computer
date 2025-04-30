"use client"

import { useState } from "react"
import { Bell, Search, User, Settings, HelpCircle, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import { logoutAction } from "@/app/actions/logoutAction"

export function SiteHeader() {
    const [showSearch, setShowSearch] = useState(false)
    const { data: session } = useSession()

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />

                {/* Search toggle for mobile */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setShowSearch(!showSearch)}
                    aria-label="Toggle search"
                >
                    <Search size={20} />
                </Button>

                {/* Search bar for desktop */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="অনুসন্ধান করুন..."
                        className="w-64 rounded-md border-gray-200 bg-gray-50 pl-10 focus-visible:ring-primary-500 lg:w-80"
                    />
                </div>
            </div>

            {/* Mobile search bar */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute inset-x-0 top-16 z-50 border-b border-gray-200 bg-white p-4 md:hidden"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="ডকুমেন্ট অনুসন্ধান করুন..."
                                className="w-full rounded-md border-gray-200 bg-gray-50 pl-10 focus-visible:ring-primary-500"
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-3">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                            <Bell size={20} />
                            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 p-0 text-xs text-white">
                                3
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>নোটিফিকেশন</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex flex-col items-start p-3">
                            <div className="flex w-full justify-between">
                                <span className="font-medium">নতুন ডকুমেন্ট</span>
                                <span className="text-xs text-gray-500">২ মিনিট আগে</span>
                            </div>
                            <span className="text-sm text-gray-500">৩টি নতুন ডকুমেন্ট যুক্ত হয়েছে</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-primary-600">সব দেখুন</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={session?.user?.image} alt="User" />
                                <AvatarFallback className="bg-primary-600 text-white">{session?.user?.name?.charAt(0)?.toUpperCase() || "A"}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="flex flex-col">
                            <span>{session?.user?.name}</span>
                            <span className="text-xs font-normal text-gray-500">{session?.user?.email}</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>প্রোফাইল</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>সেটিংস</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>সাহায্য</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex" onClick={() => logoutAction()}><LogOut className="mr-2 h-4 w-4" />
                                <span>লগআউট</span></div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
