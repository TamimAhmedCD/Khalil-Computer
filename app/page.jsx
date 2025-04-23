import WhyChooseUsSection from "@/components/Home/WhyChooseUs";
import Banner from "./../components/Home/Banner";
import Slogan from "./../components/Home/Slogan";
import Courses from "@/components/Home/OurCourses/Courses";
export const metadata = {
  title: "Home - Khalil Computer",
  description:
    "Welcome to Khalil Computer, your premier destination for professional training in graphic design, freelancing web design, and digital marketing. Learn from experts and gain the skills you need to succeed in the digital world.",
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
    </div>
  );
}
