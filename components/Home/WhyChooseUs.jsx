"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Zap,
  Briefcase,
  Award,
  DollarSign,
  LifeBuoy,
} from "lucide-react";

export default function WhyChooseUsSection() {
  const benefits = [
    {
      title: "প্রাক্টিক্যাল প্রশিক্ষণ:",
      description:
        "বাস্তব প্রজেক্টের মাধ্যমে হাতে-কলমে শেখার সুযোগ। আমরা শুধু থিওরি নয়, বরং প্র্যাকটিক্যাল প্রজেক্ট ভিত্তিক শিক্ষা দিয়ে থাকি।",
      icon: <CheckCircle className="w-10 h-10 text-blue-400" />,
    },
    {
      title: "এক্সপার্ট মেন্টর:",
      description:
        "অভিজ্ঞ এক্সপার্টদের গাইডেন্স ও সহায়তা। আমাদের মেন্টররা নিজ নিজ বিষয়ে সুদক্ষ।",
      icon: <BookOpen className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "আপডেটেড কোর্স মডিউল:",
      description:
        "আধুনিক ট্রেন্ড ও মার্কেট ডিমান্ড অনুযায়ী সাজানো কোর্স। আমরা আমাদের কোর্স কন্টেন্ট নিয়মিত আপডেট করি।",
      icon: <Zap className="w-10 h-10 text-purple-400" />,
    },
    {
      title: "ক্যারিয়ার সাপোর্ট:",
      description:
        "কোর্স শেষ হওয়ার পর আমরা ‍শিক্ষার্থীদের দেশে-বিদেশে কর্মসংস্থানের ব্যাপারে সর্বাত্মক গাইডলাইন দিয়ে থাকি।",
      icon: <Briefcase className="w-10 h-10 text-teal-400" />,
    },
    {
      title: "রিয়েল-ওয়ার্ল্ড প্রজেক্ট:",
      description:
        "কোর্সগুলো বাস্তব কাজের উপর ভিত্তি করে তৈরি। হাতে-কলমে কাজের অভিজ্ঞতা অর্জন করে প্রকৃত দক্ষতা অর্জন করুন।",
      icon: <Award className="w-10 h-10 text-purple-500" />,
    },
    // {
    //   title: "সাশ্রয়ী মূল্যে প্রশিক্ষণ:",
    //   description: "সেরা কোয়ালিটি ট্রেনিং সহজলভ্য মূল্যে। আমরা বিশ্বাস করি যে উচ্চমানের শিক্ষা সবার জন্য সহজলভ্য হওয়া উচিত।",
    //   icon: <DollarSign className="w-10 h-10 text-orange-400" />,
    // },
    {
      title: "লাইফটাইম সাপোর্ট:",
      description:
        "শেখার পর আপনি জয়েন হয়ে যাবেন ‍আমাদের কমিউনিটিতে, সেখান থেকে লাইফটাইম সাপোর্ট নিতে পারবেন।",
      icon: <LifeBuoy className="w-10 h-10 text-pink-400" />,
    },
  ];

  return (
    <section className="py-16">
      {/* Section heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-hind-siliguri">
          আমাদের কোর্স কেন <span className="text-primary-600">বেছে নিবেন</span>
        </h2>
        <div className="mt-2 w-16 h-1 bg-primary-600 mx-auto"></div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="mb-4 flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-hind-siliguri">
                {benefit.title}
              </h3>
              <p className="text-gray-600 font-hind-siliguri">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
