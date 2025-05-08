'use client'
import AllCourseCard from "@/components/Home/OurCourses/AllCourseCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchCourses = async () => {
  const res = await axios.get("/api/courses");
  return res.data;
};

export default function page() {
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  console.log(courses);
  return (
    <div className="mt-5 md:mt-10">
      {/* Heading */}
      <div className="text-center lg:w-2/4 mx-auto mb-5 md:mb-7">
        <h1 className="font-hind-siliguri font-bold text-3xl md:text-4xl mb-4 text-gray-800">
          আমাদের <span className="text-primary-600">কোর্স সমূহ</span>
        </h1>
        <p className="text-gray-600">
          প্রফেশনাল স্কিল উন্নয়নে সহায়ক সময়োপযোগী ট্রেনিং কোর্স, যেখানে রয়েছে হাতে-কলমে শেখার বাস্তবভিত্তিক সুযোগ ও অভিজ্ঞ প্রশিক্ষকদের দিকনির্দেশনা।
        </p>
      </div>
      <AllCourseCard courses={courses} isLoading={isLoading} isError={isError} />
    </div>
  );
}
