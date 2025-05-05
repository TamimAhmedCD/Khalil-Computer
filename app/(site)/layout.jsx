import Navbar from "@/components/Shared/Navbar";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import NotificationBanner from "@/components/Temp/NotificationBanner";
import Link from "next/link";
import Image from "next/image";
import { JoinFreeSeminar } from "@/components/Seminer/JoinFreeSeminar";
import { GetDiscount } from "@/components/Discount/get-discount";

export const metadata = {
  title: "Graphic Design, Freelancing & Digital Marketing Courses",
  description:
    "খলিল কম্পিউটার বাংলাদেশের অন্যতম সেরা প্রশিক্ষণ প্রতিষ্ঠান, যেখানে আপনি গ্রাফিক ডিজাইন, ওয়েব ডিজাইন, ফ্রিল্যান্সিং এবং ডিজিটাল মার্কেটিং এর উপর হাতে-কলমে প্রশিক্ষণ নিতে পারবেন। দক্ষ প্রশিক্ষকদের মাধ্যমে আপনার ক্যারিয়ার গড়ে তুলুন।",
};

export default function RootLayout({ children }) {
  return (
    <>
      <NotificationBanner />
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <Navbar />
      </div>

      <Separator className="w-full" />

      <GetDiscount triggerElements={<div className="fixed top-1/2 -translate-y-1/2 z-50c cursor-pointer">
        <Image src={'/get-discount.svg'} alt="Get Discount" width={102.9} height={544.1} className="w-8 md:w-10 h-auto" />
      </div>} />
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        {children}
      </div>
      <JoinFreeSeminar triggerElements={<div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer">
        <Image
          src="/join-free-seminar.svg"
          alt="Get Discount"
          width={102.9}
          height={544.1}
          className="w-8 md:w-10 h-auto"
        />
      </div>} />
      <Footer />

    </>
  );
}
