import { courseData } from "@/Assets/assets";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// const courses = [
//   {
//     thumbnail:
//       "https://cdn.10minuteschool.com/images/thumbnails/skills/graphics-design-course-thumbnail.jpg",
//     name: "Graphic Design করে ফ্রিল্যান্সিং",
//     mentor: "Khalil Uddin",
//     price: "999",
//   },
//   {
//     thumbnail:
//       "https://cdn.10minuteschool.com/images/thumbnails/free-graphic-design-online-course-thumbnail.jpg",
//     name: "Complete Web Development",
//     mentor: "Khalil Uddin",
//     price: "999",
//   },
//   {
//     thumbnail:
//       "https://revolutionit.com.bd/wp-content/uploads/2023/02/Yellow-Design-Agency-YouTube-Thumbnail-scaled.jpg",
//     name: "Complete Web Development",
//     mentor: "Khalil Uddin",
//     price: "999",
//   },
//   {
//     thumbnail:
//       "https://techgeekbuzz.com/media/new_post_images/Web-Development-Courses.webp",
//     name: "Complete Web Development",
//     mentor: "Khalil Uddin",
//     price: "999",
//   },
// ];

export default function CourseCard() {
  const courses = [courseData]
  return (
    <Carousel
      opts={{
        algn: "start",
      }}
    >
      <CarouselContent>
        {courses.map((course) => (
          <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
            <Card>
              <CardHeader>
                <Image
                  src={course.thumbnail}
                  width={600}
                  height={300}
                  alt={course.title}
                  className="rounded-sm w-full"
                />
                <CardTitle className="font-hind-siliguri mt-3 text-xl text-gray-700">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  <span className="text-gray-600">By</span> {course.instructor.name}
                </p>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-between">
                <p className="font-bold">
                  <span className="font-hind-siliguri">৳</span> {course.price}
                </p>
                <Link href={`/courses/${course.id}`}>
                  <Button
                    className="text-base hover:text-white text-primary-600 border-primary-600 hover:bg-primary-600"
                    variant="outline"
                  >
                    ভর্তি হোন
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
