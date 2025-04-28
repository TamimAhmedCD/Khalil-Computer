import { Hind_Siliguri, Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Shared/Navbar";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Khalil Computer | Graphic Design, Freelancing & Digital Marketing Courses",
  description:
    "খলিল কম্পিউটার বাংলাদেশের অন্যতম সেরা প্রশিক্ষণ প্রতিষ্ঠান, যেখানে আপনি গ্রাফিক ডিজাইন, ওয়েব ডিজাইন, ফ্রিল্যান্সিং এবং ডিজিটাল মার্কেটিং এর উপর হাতে-কলমে প্রশিক্ষণ নিতে পারবেন। দক্ষ প্রশিক্ষকদের মাধ্যমে আপনার ক্যারিয়ার গড়ে তুলুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${hindSiliguri.variable} ${montserrat}  antialiased font-hind-siliguri`}
      >
        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          <Navbar />
        </div>

        <Separator className="w-full" />

        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
