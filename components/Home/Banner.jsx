import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center my-5 md:mb-10">
      <div className="md:w-1/2">
        <h1 className="font-hind-siliguri text-4xl md:text-4xl lg:text-5xl lg:leading-16 font-semibold text-primary-950">
          আপনার স্বপ্ন বাস্তব করবে{" "}
          <span className="text-primary-600">আমদের প্রশিক্ষণ</span>
        </h1>
        <p className="text-gray-600 leading-7 my-5 text-justify">
          ডিজিটাল দক্ষতা শিখে ক্যারিয়ারের নতুন দিগন্ত উন্মোচন করুন! আমাদের সাথে
          গ্রাফিক ডিজাইন, ফ্রিল্যান্সিং, ওয়েব ডিজাইন ও ডিজিটাল মার্কেটিং শিখুন
          এবং আপনার সাফল্যের যাত্রা শুরু করুন।
        </p>
        <div className="flex gap-3 font-hind-siliguri">
          <a href="#courses"><button
            className="hover:bg-primary-600 py-3 cursor-pointer text-primary-600 rounded-md border-primary-600 transition-all duration-600 flex items-center gap-2 group hover:text-white border px-4"
          >
            {/* <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" /> */}
            কোর্স সমূহ
          </button></a>
          <Link href="registration-form"><button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 flex items-center gap-2 group py-3 px-4 rounded-md text-white">
            ভর্তি হোন
          </button></Link>
        </div>
      </div>
      <div className="md:w-1/2 mt-5 md:mt-0">
        <Image
          src="/banner.png"
          width="600"
          height="600"
          className="w-full"
          alt="Banner Image"
        />
      </div>
    </div>
  );
}
