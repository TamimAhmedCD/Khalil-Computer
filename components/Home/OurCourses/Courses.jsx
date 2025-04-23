import Link from "next/link";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";

export default async function Courses() {
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
      {/* Card & Card Content */}
      <div className="mt-8">
        <CourseCard />
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
