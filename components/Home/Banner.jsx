import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center my-10">
      <div className="md:w-1/2">
        <h1 className="font-hind-siliguri text-4xl md:text-4xl lg:text-6xl lg:leading-20 font-semibold text-primary-950">
          আপনার স্বপ্ন বাস্তব করবে{" "}
          <span className="text-primary-600">আমদের প্রশিক্ষণ</span>
        </h1>
        <p className="text-gray-600 leading-7 my-5">
          ডিজিটাল দক্ষতা শিখে ক্যারিয়ারের নতুন দিগন্ত উন্মোচন করুন! আমাদের সাথে
          গ্রাফিক ডিজাইন, ফ্রিল্যান্সিং, ওয়েব ডিজাইন ও ডিজিটাল মার্কেটিং শিখুন
          এবং আপনার সাফল্যের যাত্রা শুরু করুন।
        </p>
        <Button
          className="bg-primary-600 hover:bg-primary-700 transition-all duration-200 flex items-center gap-2 group"
          size="lg"
        >
          শেখা শুরু করুন
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </div>
      <div className="md:w-1/2">
        <Image src="/banner.jpg" width="600" height="600" className="w-full" alt="Banner Image" />
      </div>
    </div>
  );
}
