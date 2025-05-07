import CourseCardSkeleton from '@/components/loader/CourseCardSkeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AllCourseCard({ courses, isLoading }) {
    console.log(courses);

    if (isLoading) {
        return <CourseCardSkeleton />
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses?.map((course) => (
                    <Card key={course._id}>
                        <Link href={`/courses/${course._id}`}>
                            <CardHeader>
                                <Image
                                    src={course.courseThumbnail}
                                    width={600}
                                    height={300}
                                    alt={course.title}
                                    className="rounded-sm w-full"
                                />
                                <CardTitle className="font-hind-siliguri mt-3 text-lg text-gray-700" title={course.title}>
                                    {course.title.split(" ").slice(0, 6).join(" ")}
                                </CardTitle>
                            </CardHeader>
                        </Link>
                        <CardContent>
                            <p className="font-medium">
                                <span className="text-gray-600">By</span>{" "}
                                {course.instructorName}
                            </p>
                        </CardContent>
                        <Separator />
                        <CardFooter className="flex justify-between">
                            <p className="font-bold text-sm">
                                {course.discount ? (
                                    <>
                                        <span className="line-through text-muted-foreground mr-1">
                                            <span className="font-hind-siliguri">৳</span> {course.price}
                                        </span>
                                        <span className="text-primary font-bold">
                                            <span className="font-hind-siliguri">৳</span>{' '}
                                            {course.price - (course.price * course.discount) / 100}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="font-hind-siliguri">৳</span> {course.price}
                                    </>
                                )}
                            </p>
                            <Link href={`/courses/${course._id}`}>
                                <Button
                                    className="text-base hover:text-white text-primary-600 border-primary-600 hover:bg-primary-600"
                                    variant="outline"
                                >
                                    ভর্তি হোন
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}
