import Navbar from "@/components/Shared/Navbar";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import NotificationBanner from "@/components/Temp/NotificationBanner";
import Image from "next/image";
import { JoinFreeSeminar } from "@/components/Seminer/JoinFreeSeminar";
import { GetDiscount } from "@/components/Discount/get-discount";

export const metadata = {
  title: "Graphic Design, Freelancing & Digital Marketing Courses",
  description:
    "খলিল কম্পিউটার — ২৫ বছরের অভিজ্ঞতায় প্রযুক্তি শিক্ষা ও দক্ষতা উন্নয়নে প্রতিশ্রুতিবদ্ধ। আমরা তাত্ত্বিক নয়, বাস্তবভিত্তিক প্রশিক্ষণের মাধ্যমে তরুণদের আইটি খাতে দক্ষ করে গড়ে তুলি। আজই শুরু করুন আপনার সাফল্যের যাত্রা আমাদের যেকোনো কোর্স দিয়ে।",
};

export default function RootLayout({ children }) {
  return (
    <>
      <NotificationBanner />
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <Navbar />
      </div>

      <Separator className="w-full" />

      <GetDiscount triggerElements={<div className="fixed top-1/2 -translate-y-1/2 z-50 cursor-pointer">
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
