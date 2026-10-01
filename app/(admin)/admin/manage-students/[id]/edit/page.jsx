"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddStudent from '../../../add-student/page';

const fetchStudent = async (id) => {
    const res = await axios.get(`/api/admin/students/${id}`);
    return res.data;
};

export default function EditStudentPage() {
    const params = useParams();
    const router = useRouter();
    const studentId = params.id;

    const {
        data: student,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["student", studentId],
        queryFn: () => fetchStudent(studentId),
        enabled: !!studentId,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <div className="p-6 border-b bg-white">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div>
                            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
                            <div className="h-4 w-48 bg-gray-100 animate-pulse rounded"></div>
                        </div>
                        <Button variant="outline" disabled>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground font-medium">Loading student data...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !student) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center p-8 bg-white border rounded-lg shadow-sm">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Student Not Found</h2>
                    <p className="text-gray-500 mb-6">Could not load the information for this student.</p>
                    <Button onClick={() => router.back()} variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/30">
            {/* Minimal Header just for back button */}
            <div className="border-b bg-white top-0 z-10 w-full p-6">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Student</h1>
                        <p className="text-sm text-gray-500">Update information for {student.studentName}</p>
                    </div>
                    <Button
                        onClick={() => router.push(`/admin/manage-students/${studentId}`)}
                        variant="outline"
                        className="bg-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Details
                    </Button>
                </div>
            </div>

            <div className="flex-1 w-full bg-transparent p-0 md:p-6 sm:-mt-10 overflow-hidden">
                <AddStudent student={student} />
            </div>
        </div>
    );
}
