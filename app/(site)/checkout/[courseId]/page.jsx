'use client'
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'

const fetchCourse = async (id) => {
    const res = await axios.get(`/api/courses/${id}`);
    return res.data;
};

export default function CheckoutPage() {
    const params = useParams()
    const id = params?.courseId

    const {
        data: course,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["course", id],
        queryFn: () => fetchCourse(id),
        enabled: !!id,
    });

    console.log(course);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Back button */}
                <Link
                    href={`/courses/${course?._id}`}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    কোর্স পেইজে ফিরে যান
                </Link>

                <h1 className="text-2xl font-bold mb-8 text-center">কোর্স চেকআউট</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content - Checkout form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative h-16 w-24 overflow-hidden rounded-md flex-shrink-0">
                                    <Image src={course?.courseThumbnail || "/placeholder.svg"} alt={course?.title} fill className="object-cover" />
                                </div>
                                <div>
                                    <h2 className="font-medium">{course.title}</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {course.courseDuration} • {course.classTiming}
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            {/* <CheckoutForm /> */}
                        </div>
                    </div>

                    {/* Sidebar - Order summary */}
                    <div className="lg:col-span-1">
                        {/* <div className="sticky top-8">
                            <OrderSummary
                                course={{
                                    ...course,
                                    benefits: courseBenefits,
                                }}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
