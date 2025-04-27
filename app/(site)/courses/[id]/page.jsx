import { courseData } from "@/Assets/assets";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function CourseDetails({ params }) {
  const courseId = params.id;
  // Since your courseData is a single object, you'll need to change it to an array for multiple courses
  const course = [courseData].find((course) => course.id === courseId);

  if (!course) {
    return <div>কোর্স পাওয়া যায়নি</div>;
  }

  return (
    <div className="flex">
      <main className="flex-1">
        <div className="py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={750}
                height={450}
                className="rounded-lg mb-5"
              />
              {/* Tabs */}
              <Tabs defaultValue="info">
                <TabsList className="border-b w-full bg-transparent">
                  <TabsTrigger value="info">কোর্সের তথ্য</TabsTrigger>
                  <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-5">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    কোর্স সম্পর্কে বিস্তারিত
                  </h2>

                  {/* <div className="flex items-center gap-2 text-sm text-purple-600 mb-4">
                    <span>🎁 প্যাকেজিং ডিজাইন এবং সফলতার গল্প</span>
                    <span className="text-purple-600">→ এখানে দেখুন</span>
                  </div> */}

                  <p className="text-gray-700 mb-6">{course.about}</p>

                  <div>
                    <h5 className="text-xl font-bold text-gray-800">
                      কোর্সটি যাদের জন্য
                    </h5>
                    <ul className="list-disc ml-8 my-4 text-gray-700">
                      {course.whoCanEnroll.map((item, i) => (
                        <li className="py-1" key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-gray-800">
                      কোর্সটি করে আপনি কী কী করতে পারবেন?
                    </h5>
                    <ul className="list-disc ml-8 my-4 text-gray-700">
                      {course.whatYouCanDo.map((item, i) => (
                        <li className="py-1" key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-gray-800">
                      কেন কোর্সটি করবেন?
                    </h5>
                    <ul className="list-disc ml-8 my-4 text-gray-700">
                      {course.whatYouLearn.map((item, i) => (
                        <li className="py-1" key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="flex items-center gap-2 text-purple-600 mb-8">
                    <span className="text-purple-600">+</span>
                    <span>আরও দেখুন</span>
                  </button>

                  <h2 className="text-xl font-semibold mb-4">
                    কোর্সটি কারা যা শিখবেন
                  </h2>
                </TabsContent>

                <TabsContent value="reviews">
                  <h5 className="text-xl font-bold text-gray-800">
                    শিক্ষার্থীদের মতামত সমূহ
                  </h5>
                  <Image
                    src="https://learn.designoriel.com/wp-content/plugins/tutor/assets/images/emptystate.svg"
                    width={750}
                    height={400}
                    className="mt-20"
                    alt="No Feedback"
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Course Info */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-4">
                {/* Price */}
                <div className="mb-4">
                  <h3 className="text-3xl font-bold">৳ {course.price}</h3>
                </div>

                {/* Buy Button */}
                <Button className="w-full bg-primary-600 hover:bg-primary-700 mb-6 py-6">
                  কোর্সটি কিনুন
                </Button>

                {/* Instructor */}
                <div className="mb-6">
                  <h4 className="text-gray-500 mb-3">কোর্স ইনস্ট্রাক্টর</h4>
                  <div className="flex items-center gap-3">
                    <Image
                      src={course.instructor.photo}
                      alt="Instructor"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h5 className="font-medium">{ course.instructor.name}</h5>
                      <p className="text-sm text-gray-500">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div>
                  <h4 className="font-medium mb-4">এই কোর্সে যা থাকছে</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">■</span>
                      <span>কোর্সটি করতেছে ২.৫০ ঘন্টা</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">■</span>
                      <span>সময় লাগবে ১০ ঘন্টা</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">■</span>
                      <span>১৫টি ভিডিও ক্লাস</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">■</span>
                      <span>ক্লাসরুমে প্যাকেজিং প্রজেক্ট</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">■</span>
                      <span>প্র্যাকটিক্যাল ভাবে শেখানো</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">■</span>
                      <span>সার্টিফিকেট প্রদান</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">■</span>
                      <span>কোর্সের দেয়ার আজীবন</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
