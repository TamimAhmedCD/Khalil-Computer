"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Assuming you have Card components in this path
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export function AdminWelcomeCard() {
    const { data: session } = useSession()
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setCurrentDateTime(date.toLocaleString("bn-BD", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
            }));
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <Card className="overflow-hidden p-0">
            <CardContent className="p-0">
                <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
                    {/* Decorative elements */}
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white opacity-10"></div>
                    <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white opacity-10"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={session?.user?.image} alt="User" />
                                <AvatarFallback className="bg-white text-primary-600">
                                    {session?.user?.name?.charAt(0)?.toUpperCase() || "A"}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-bold">স্বাগতম, {session?.user?.name}</h2>
                                <p className="text-primary-100">আপনার ড্যাশবোর্ডে আপনাকে স্বাগতম। আজকের সামগ্রিক অবস্থা দেখুন।</p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button className="bg-white text-primary-700 hover:bg-primary-50">রিপোর্ট দেখুন</Button>
                            <Button variant="outline" className="bg-transparent hover:text-primary-600">নতুন শিক্ষার্থী যোগ করুন</Button>
                        </div>
                    </div>

                    {/* Right-side date and time */}
                    <div className="absolute right-6 bottom-6 text-sm text-primary-100">
                        {currentDateTime}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
