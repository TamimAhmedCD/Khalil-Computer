"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function WhyChooseUsSection() {
  const benefits = [
    {
      title: "প্রাক্টিক্যাল প্রশিক্ষণ:",
      description: "বাস্তব প্রজেক্টের মাধ্যমে হাতে-কলমে শেখার সুযোগ।",
    },
    {
      title: "এক্সপার্ট মেন্টর:",
      description: "অভিজ্ঞ ইন্ডাস্ট্রি এক্সপার্টদের গাইডেন্স ও সহায়তা।",
    },
    {
      title: "আপডেটেড কোর্স:",
      description: "আধুনিক ট্রেন্ড ও মার্কেট ডিমান্ড অনুযায়ী সাজানো কোর্স।",
    },
    {
      title: "ফ্রিল্যান্সিং ও ক্যারিয়ার সাপোর্ট:",
      description: "কাজ পাওয়ার গাইডলাইন ও ক্যারিয়ার কনসালটেশন।",
    },
    {
      title: "সার্টিফিকেট ও স্বীকৃতি:",
      description: "কোর্স শেষে আন্তর্জাতিক মানের সার্টিফিকেট।",
    },
    {
      title: "সাশ্রয়ী মূল্যে প্রশিক্ষণ:",
      description: "সেরা কোয়ালিটি ট্রেনিং সহজলভ্য মূল্যে।",
    },
    {
      title: "লাইফটাইম সাপোর্ট:",
      description: "শেখার পরও সমস্যা হলে আমাদের কাছে সাহায্য পাবেন।",
    },
  ];

  return (
    <section className="py-16">
      {/* Section heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-primary-950">
          কেন আমাদের বেছে নিবেন?
        </h2>
        <div className="mt-2 w-16 h-1 bg-primary-600 mx-auto"></div>
      </div>

      <div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Side (Left on desktop) */}

          {/* Image */}
          <div className="md:w-1/2">
            <Image
              src="/whyChooseUs.jpg"
              alt="Why Choose Us"
              width={400}
              height={400}
              className="w-full"
            />
          </div>

          {/* Content Side (Right on desktop) */}
          <div className="md:w-1/2">
            <div className="mb-6">
              <h3 className="text-2xl font-medium text-primary-600 flex items-center gap-2 mb-6 font-hind-siliguri">
                <span>আমাদের সুবিধাসমূহ</span>
              </h3>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-2 transition-colors duration-200 rounded-md"
                  >
                    <div className="w-5 h-5 rounded-sm bg-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <span className="text-gray-700 font-bold">
                        {benefit.title}
                      </span>{" "}
                      <span className="text-gray-700">
                        {benefit.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Button
                className="bg-primary-600 hover:bg-primary-700 transition-all duration-200 flex items-center gap-2 group"
                size="lg"
              >
                আজই ভর্তি হন
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
