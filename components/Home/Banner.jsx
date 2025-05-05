'use client'
import { BookmarkCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { JoinFreeSeminar } from "../Seminer/JoinFreeSeminar";

export default function Banner() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:my-8 mt-5 md:mb-10">
      <div className="md:w-1/2">
        <div className="flex items-center gap-3 mb-3">
          <BookmarkCheck className="text-primary-600" />
          <h6 className="text-lg text-primary-600">অগ্র যাত্রার ২৫ বৎসর</h6>
        </div>
        <h1 className="font-hind-siliguri text-4xl md:text-4xl lg:text-5xl lg:leading-16 font-semibold text-primary-950">
          আপনার স্বপ্ন {" "}
          <span className="text-primary-600">পূর্ণ করবে আমদের </span>
          বাস্তব প্রশিক্ষণ
        </h1>
        <p className="text-gray-600 leading-7 my-5 text-justify">
          খলিল কম্পিউটার — ২৫ বছরের অভিজ্ঞতায় প্রযুক্তি শিক্ষা ও দক্ষতা উন্নয়নে প্রতিশ্রুতিবদ্ধ।
          আমরা তাত্ত্বিক নয়, বাস্তবভিত্তিক প্রশিক্ষণের মাধ্যমে তরুণদের আইটি খাতে দক্ষ করে গড়ে তুলি। আজই শুরু করুন আপনার সাফল্যের যাত্রা আমাদের যেকোনো কোর্স দিয়ে।
        </p>
        <div className="flex gap-3 font-hind-siliguri">
          <a href="#courses">
            <button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 flex items-center gap-2 group py-3 px-4 rounded-md text-white">
              কোর্স সমূহ
            </button></a>

          <JoinFreeSeminar triggerElements={<span className="hover:bg-primary-600 py-3 cursor-pointer text-primary-600 rounded-md border-primary-600 transition-all duration-600 flex items-center gap-2 group hover:text-white border px-4">

            জয়েন ফ্রি সেমিনার
          </span>} />

        </div>
      </div>
      <div className="md:w-1/2 my-5 md:my-0 flex justify-center">
        <Image
          src="/banner.svg"
          alt="Banner Image"
          width={400}
          height={400}
          priority
          className="h-auto w-full max-w-[500px] object-contain"
        />
      </div>
    </div>
  );
}
