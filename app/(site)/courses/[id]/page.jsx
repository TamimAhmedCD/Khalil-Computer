'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import parse from 'html-react-parser';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fetchCourse = async (id) => {
  const res = await axios.get(`/api/courses/${id}`);
  return res.data;
};



export default function CourseDetails() {
  const params = useParams();
  const id = params?.id;

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourse(id),
    enabled: !!id,
  });

  if (isLoading) return <p>লোড হচ্ছে...</p>;
  if (isError) return <p>ত্রুটি: {(error).message}</p>;

  return (
    <div className="p-4">
      <main className="flex-1">
        <div className="py-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-2">
            <h1 className="text-3xl font-semibold text-primary-950">{course?.title}</h1>
            <div className="flex gap-2">{course?.tags.map((tag) => <Badge key={tag} variant="outline" className="py-2 border-primary-300 text-primary-600"> {tag}</Badge>)}</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Course Content */}
            <div className="lg:col-span-2">
              <Image
                src={course?.courseThumbnail}
                alt={course?.title}
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
                      {course?.description}
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
                  <div className="prose">{parse(course?.fullDescription)}</div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Course Info */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-4">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-primary-900">৳ {course.price}</h3>
                </div>

                <Button className="w-full bg-primary-600 hover:bg-primary-700 mb-6 py-6">
                  ভর্তি হোন
                </Button>

                <div className="mb-6">
                  <h4 className="text-gray-500 mb-3">কোর্স ইনস্ট্রাক্টর</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={course?.instructorPhoto} alt="User" />
                      <AvatarFallback className="bg-primary-600 text-white">{course?.instructorName?.charAt(0)?.toUpperCase() || "A"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h5 className="font-medium">{course?.instructorName}</h5>
                      <p className="text-sm text-gray-500">
                        {course?.instructorDesignation ? course.instructorDesignation : "IT Expert"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="prose">{parse(course?.whatInside)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
