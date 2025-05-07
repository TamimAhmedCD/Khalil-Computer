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
      <div className="text-center mb-12">
        <h1 className="font-hind-siliguri font-bold text-3xl md:text-4xl mb-3 text-gray-800">
          আমাদের <span className="text-primary-600">কোর্স সমূহ</span>
        </h1>
      </div>
      <AllCourseCard courses={courses} isLoading={isLoading} isError={isError} />
    </div>
  );
}
