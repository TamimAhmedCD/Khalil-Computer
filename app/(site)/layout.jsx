import Navbar from "@/components/Shared/Navbar";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import NotificationBanner from "@/components/Temp/NotificationBanner";

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

      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        {children}
      </div>

      <Footer />

    </>
  );
}
