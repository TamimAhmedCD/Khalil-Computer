'use client'
import Link from "next/link";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const fetchCourses = async () => {
  const res = await axios.get('/api/courses');
  return res.data;
};

export default function Courses() {

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });
  console.log(courses);
  if (isLoading) {
    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 p-4 border rounded-xl">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 mt-3" /> {/* Title */}
            <Skeleton className="h-4 w-1/2" /> {/* Author */}
            <Skeleton className="h-4 w-2/3 mt-8" /> {/* Stroke / Description */}
            <div className="flex justify-between items-center mt-5">
              <Skeleton className="h-4 w-[80px]" /> {/* Price */}
              <Skeleton className="h-8 w-[80px]" /> {/* Button */}
            </div>
          </div>
        </div>
      ))}
    </div>
    )
  }

  return (
    <section id="courses">
      {/* Heading */}
      <div className="text-center lg:w-2/4 mx-auto">
        <h1 className="font-hind-siliguri font-bold text-3xl md:text-4xl mb-4">
          আমাদের <span className="text-primary-600">কোর্স সমূহ</span>
        </h1>
        <p className="text-gray-600">
          আমাদের কোর্স সমূহ আপনাকে দেবে বাস্তব জ্ঞান ও দক্ষতা, যা আপনাকে ডিজাইন
          ও ফ্রিল্যান্সিংয়ে সফলতা এনে দেবে।
        </p>
      </div>
      {/* Card & Card Content */}
      <div className="mt-8">
        <CourseCard courses={courses} />
      </div>
      {/* Button */}
      <div className="flex justify-center">
        <Link href="/courses">
          <Button
            className="text-base mt-10 hover:text-white text-primary-600 border-primary-600 hover:bg-primary-600 rounded-full p-6"
            variant="outline"
          >
            সকল কোর্স
          </Button>
        </Link>
      </div>
    </section>
  );
}
