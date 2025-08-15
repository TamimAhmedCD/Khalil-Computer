"use client";

import StudentCardGenerator from "@/components/admin/ManageStudent/StudentCardGenerator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, Calendar, CreditCard, Edit, GraduationCap, Heart, Mail, MapPin, Phone, Trash2, User, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
// import StudentCardGenerator from './StudentCardGenerator'

const fetchStudent = async (id) => {
    const res = await axios.get(`/api/admin/students/${id}`);
    return res.data;
};

export default function StudentDetails() {
    const router = useRouter();
    const params = useParams();
    const studentId = params.id;
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
                <p>Loading student details...</p>
            </div>
        );
    }

    if (isError || !student) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Student not found</p>
                {/* Back button */}
                {/* <Button onClick={() => router.push("/admin/students")} className="ml-4">Back</Button> */}
            </div>
        );
    }

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n.charAt(0))
            .join("");
    };

    const getStatusColor = (status) => {
        return status === "Active"
            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
            : "bg-gray-100 text-gray-800 border-gray-200";
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    };

    const handleEdit = () => {
        router.push(`/admin/students/${studentId}/edit`);
    };

    const handleDeleteConfirm = () => {
        console.log("Deleting student with ID:", student._id);
        alert(`Student ${student.studentName} has been deleted successfully!`);
        setIsDeleteDialogOpen(false);
        router.push("/admin/students");
    };

    console.log(student);

    return (
        <div className="m-6 md:m-8">
            <div className="space-y-8">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between">
                    <Link href="/admin/manage-students">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-primary-100 border-primary-200 bg-transparent"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Students
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={handleEdit}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Student
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Student Header */}
                <div className="rounded-2xl border p-8">
                    <div className="flex items-start gap-6">
                        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                            <AvatarImage src={student.studentImage || "/placeholder.svg"} alt={student.studentName} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-2xl font-bold">
                                {getInitials(student.studentName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">{student.studentName}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-gray-600 font-medium">Student ID: #{student.idNumber}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                                <div className="flex items-center text-gray-700">
                                    <GraduationCap className="w-5 h-5 mr-3 text-blue-500" />
                                    <span className="font-medium">Course:</span>
                                    <span className="ml-2 text-blue-600 font-semibold">{student.course}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="w-5 h-5 mr-3 text-green-500" />
                                    <span className="font-medium">Age:</span>
                                    <span className="ml-2">{calculateAge(student.birthDate)} years old</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Content */}
                <div className=" rounded-2xl border">
                    <Tabs defaultValue="details" className="p-8">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="details" className="flex items-center gap-2 text-base py-3">
                                <User className="w-5 h-5" />
                                Student Details
                            </TabsTrigger>
                            <TabsTrigger value="id-card" className="flex items-center gap-2 text-base py-3">
                                <CreditCard className="w-5 h-5" />
                                ID Card Generator
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Date of Birth</label>
                                        <p className="text-lg text-gray-900 mt-1">{formatDate(student.birthDate)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Gender</label>
                                        <p className="text-lg text-gray-900 mt-1">{student.gender}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Blood Group</label>
                                        <div className="flex items-center mt-1">
                                            <Heart className="w-5 h-5 mr-2 text-red-500" />
                                            <p className="text-lg text-gray-900 font-semibold">{student.bloodGroup}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                            Marital Status
                                        </label>
                                        <p className="text-lg text-gray-900 mt-1">{student.maritalStatus}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Education</label>
                                        <p className="text-lg text-gray-900 mt-1">{student.education}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Occupation</label>
                                        <p className="text-lg text-gray-900 mt-1">{student.occupation}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Family Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <Users className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900">Family Information</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Father's Name</label>
                                        <p className="text-lg text-gray-900 mt-1">{student.fatherName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Mother's Name</label>
                                        <p className="text-lg text-gray-900 mt-1">{student.motherName}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Contact Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
                                </div>
                                <div className="space-y-6 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                                Email Address
                                            </label>
                                            <div className="flex items-center mt-1">
                                                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                                                <p className="text-lg text-gray-900">{student.email}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                                Student Mobile
                                            </label>
                                            <div className="flex items-center mt-1">
                                                <Phone className="w-5 h-5 mr-3 text-green-500" />
                                                <p className="text-lg text-gray-900">{student.studentMobile}</p>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                                Guardian Mobile
                                            </label>
                                            <div className="flex items-center mt-1">
                                                <Phone className="w-5 h-5 mr-3 text-orange-500" />
                                                <p className="text-lg text-gray-900">{student.guardianMobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                                Current Address
                                            </label>
                                            <div className="flex items-start mt-1">
                                                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
                                                <p className="text-lg text-gray-900">{student.currentAddress}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                                Permanent Address
                                            </label>
                                            <div className="flex items-start mt-1">
                                                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
                                                <p className="text-lg text-gray-900">{student.permanentAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Academic Information */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                        <GraduationCap className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-900">Academic Information</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-amber-50 rounded-xl">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                            Enrolled Course
                                        </label>
                                        <p className="text-xl text-gray-900 font-semibold mt-1">{student.course}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                                            Batch Number:
                                        </label>
                                        <p className="text-lg text-gray-900 mt-1">{student.batchNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="id-card" className="space-y-6">
                            <StudentCardGenerator student={student} />
                        </TabsContent>
                    </Tabs>
                </div>
                {/* Same UI structure as your original mock component */}
                {/* Replace student.id → student._id and other fields accordingly */}
                {/* Example: student.studentName, student.course, student.birthDate, etc. */}
            </div>
        </div>
    );
}
