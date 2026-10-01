"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  BookOpen,
  Megaphone,
  CreditCard,
  TrendingUp,
  UserPlus,
  ArrowRight,
  WalletCards,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AdminWelcomeCard() {
  const { data: session } = useSession();
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Time ticker
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentDateTime(
        date.toLocaleString("bn-BD", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Dashboard Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard-stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome Header Section */}
      <Card className="overflow-hidden border-0 shadow-lg relative bg-gradient-to-r from-primary-700 via-primary-600 to-indigo-600 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0C44.772 0 0 44.772 0 100s44.772 100 100 100 100-44.772 100-100S155.228 0 100 0z" fill="white" />
          </svg>
        </div>
        <div className="absolute -bottom-10 -left-10 opacity-10 pointer-events-none">
          <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="150" rx="40" fill="white" transform="rotate(25)" />
          </svg>
        </div>

        <CardContent className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-1 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Avatar className="h-16 w-16 border-2 border-white/50 rounded-xl">
                <AvatarImage src={session?.user?.image} alt="User" />
                <AvatarFallback className="bg-primary text-2xl font-bold rounded-xl">
                  {session?.user?.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                স্বাগতম, {session?.user?.name}
              </h1>
              <p className="text-primary-100 text-lg opacity-90">
                খলিল কম্পিউটার ম্যানেজমেন্ট ড্যাশবোর্ড
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0 w-full md:w-auto">
            <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-200" />
              <span className="text-sm font-medium text-white">{currentDateTime}</span>
            </div>

            <div className="flex gap-3 mt-2 w-full md:w-auto">
              <Link href="/admin/add-student" className="flex-1 md:flex-none">
                <Button className="w-full bg-white text-primary-700 hover:bg-primary-50 shadow-sm border-0 font-semibold gap-2">
                  <UserPlus className="w-4 h-4" />
                  নতুন শিক্ষার্থী
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Key Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card className="hover:shadow-md transition-all border-l-4 border-l-blue-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider mb-2">মোট শিক্ষার্থী</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : stats?.stats?.totalStudents || 0}
              </h2>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Due Payments */}
        <Card className="hover:shadow-md transition-all border-l-4 border-l-orange-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider mb-2">বকেয়া আছে</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : stats?.stats?.unpaidStudents || 0} <span className="text-sm font-normal text-muted-foreground">জন</span>
              </h2>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <CreditCard className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Total Collections */}
        <Card className="hover:shadow-md transition-all border-l-4 border-l-emerald-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider mb-2">মোট কালেকশন</p>
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="text-lg">৳</span>{isLoading ? "..." : formatCurrency(stats?.financial?.totalCollected)}
              </h2>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <WalletCards className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Total Courses */}
        <Card className="hover:shadow-md transition-all border-l-4 border-l-purple-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-none text-muted-foreground uppercase tracking-wider mb-2">মোট কোর্স</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {isLoading ? "..." : stats?.stats?.totalCourses || 0}
              </h2>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <BookOpen className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Recent Students List */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 pb-4">
            <div>
              <CardTitle className="text-xl text-gray-900">নতুন শিক্ষার্থী তালিকা</CardTitle>
              <CardDescription>সম্প্রতি ভর্তি হওয়া ৫ জন শিক্ষার্থী</CardDescription>
            </div>
            <Link href="/admin/manage-students">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                সব দেখুন <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center flex flex-col items-center justify-center text-muted-foreground">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                তথ্য লোড হচ্ছে...
              </div>
            ) : stats?.recentStudents?.length > 0 ? (
              <div className="divide-y">
                {stats.recentStudents.map((student) => (
                  <div key={student._id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border shadow-sm">
                        <AvatarImage src={student.studentImage} alt={student.studentName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {student.studentName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={`/admin/manage-students/${student._id}`} className="font-semibold text-gray-900 hover:text-primary line-clamp-1">
                          {student.studentName}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="font-normal text-xs px-2 py-0 h-5">
                            {student.course}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <Badge
                        variant="outline"
                        className={
                          !student.outstandingAmount || student.outstandingAmount == 0
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }
                      >
                        {!student.outstandingAmount || student.outstandingAmount == 0
                          ? "পরিশোধিত"
                          : `বকেয়া: ৳${student.outstandingAmount}`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি</p>
              </div>
            )}
            <div className="p-4 border-t bg-gray-50 block sm:hidden">
              <Link href="/admin/manage-students">
                <Button variant="outline" className="w-full justify-center gap-2">
                  সব শিক্ষার্থী দেখুন <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 4. Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader className="border-b bg-gray-50/50 pb-4">
            <CardTitle className="text-lg text-gray-900">কুইক অ্যাকশনস</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex flex-col gap-3">
            <Link href="/admin/add-student">
              <Button variant="outline" className="w-full justify-start h-14 px-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <UserPlus className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium text-base">নতুন শিক্ষার্থী ভর্তি করুন</span>
              </Button>
            </Link>

            <Link href="/admin/add-course">
              <Button variant="outline" className="w-full justify-start h-14 px-4 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium text-base">নতুন কোর্স তৈরি করুন</span>
              </Button>
            </Link>

            <Link href="/admin/add-notice">
              <Button variant="outline" className="w-full justify-start h-14 px-4 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Megaphone className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-medium text-base">নতুন নোটিশ তৈরি করুন</span>
              </Button>
            </Link>

            <Link href="/admin/manage-students">
              <Button variant="outline" className="w-full justify-start h-14 px-4 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-medium text-base">সার্টিফিকেট ও আইডি কার্ড</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
