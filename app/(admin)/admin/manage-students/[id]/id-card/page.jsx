"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import StudentCardGenerator from "@/components/admin/ManageStudent/StudentCardGenerator";

const fetchStudent = async (id) => {
    const res = await axios.get(`/api/admin/students/${id}`);
    return res.data;
};

export default function IdCardPage() {
    const params = useParams();
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading student data...</p>
                </div>
            </div>
        );
    }

    if (isError || !student) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-muted-foreground">Student not found</p>
                    <Link href="/admin/manage-students">
                        <Button className="mt-4">Back to Students</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link href={`/admin/manage-students/${studentId}`}>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Student Details
                        </Button>
                    </Link>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold text-gray-900">{student.studentName}</h1>
                        <p className="text-sm text-muted-foreground">ID Card Generator</p>
                    </div>
                </div>

                {/* ID Card Generator Component */}
                <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
                    <StudentCardGenerator student={student} />
                </div>
            </div>
        </div>
    );
}
