import { courseData } from "@/Assets/assets";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function CourseDetails({ params }) {
  const courseId = params.id;
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
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={750}
                height={450}
                className="rounded-lg mb-5"
              />

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700">
                    কোর্সের বিবরণ
                  </CardTitle>
                  <CardDescription>
                    <p className="text-gray-700 text-justify text-base">
                      {course.about}
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700">
                    কোর্স সম্পর্কে বিস্তারিত
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <h5 className="text-lg font-bold text-gray-800">
                      কোর্সটি যাদের জন্য
                    </h5>
                    <ul className="list-disc ml-8 my-4 text-gray-700">
                      {course.whoCanEnroll.map((item, i) => (
                        <li className="py-1" key={i}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-gray-800">
                      কোর্সটি করে আপনি কী কী করতে পারবেন?
                    </h5>
                    <ul className="list-disc ml-8 my-4 text-gray-700">
                      {course.whatYouCanDo.map((item, i) => (
                        <li className="py-1" key={i}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-gray-800">
                      কেন কোর্সটি করবেন?
                    </h5>
                    <ul className="list-disc ml-8 my-4 text-gray-700">
                      {course.whatYouLearn.map((item, i) => (
                        <li className="py-1" key={i}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Course Info */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-4">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold">৳ {course.price}</h3>
                </div>

                <Button className="w-full bg-primary-600 hover:bg-primary-700 mb-6 py-6">
                  কোর্সটি কিনুন
                </Button>

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
                      <h5 className="font-medium">{course.instructor.name}</h5>
                      <p className="text-sm text-gray-500">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                </div>

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
