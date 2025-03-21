import React from "react";
import CourseCard from "./CourseCard";

export default function Courses() {
  return (
    <section>
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
      <CourseCard />
    </section>
  );
}
