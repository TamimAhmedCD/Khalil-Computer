import WhyChooseUsSection from "@/components/Home/WhyChooseUs";
import Courses from "@/components/Home/OurCourses/Courses";
import Banner from "@/components/Home/Banner";
import Slogan from "@/components/Home/Slogan";
import { BengaliFaqSection } from "@/components/Home/faq";
import { MarqueeDemo } from "@/components/Home/Testimonials";

export const metadata = {
  title: "Khalil Computer | Graphic Design, Freelancing & Digital Marketing Courses",
  description:
    "খলিল কম্পিউটার বাংলাদেশের অন্যতম সেরা প্রশিক্ষণ প্রতিষ্ঠান, যেখানে আপনি গ্রাফিক ডিজাইন, ওয়েব ডিজাইন, ফ্রিল্যান্সিং এবং ডিজিটাল মার্কেটিং এর উপর হাতে-কলমে প্রশিক্ষণ নিতে পারবেন। দক্ষ প্রশিক্ষকদের মাধ্যমে আপনার ক্যারিয়ার গড়ে তুলুন।",
};
export default async function Home() {
  return (
    <div>
      <header>
        <Banner />
      </header>
      <Slogan />
      <WhyChooseUsSection />
      <Courses />
      <BengaliFaqSection />
      <MarqueeDemo />
    </div>
  );
}