"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, Calendar, CreditCard, Edit, GraduationCap, Heart, Mail, MapPin, Phone, Trash2, User, Users, FileText, IdCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const fetchStudent = async (id) => {
    const res = await axios.get(`/api/admin/students/${id}`);
    return res.data;
};

export default function StudentDetails() {
    const router = useRouter();
    const params = useParams();
    const studentId = params.id;
    const queryClient = useQueryClient();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        data: student,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["student", studentId],
        queryFn: () => fetchStudent(studentId),
        enabled: !!studentId,
    });

    const handleDeleteConfirm = async () => {
        try {
            setIsDeleting(true);
            const res = await axios.delete(`/api/admin/students/${studentId}`);
            if (res.data.success) {
                toast.success("Student deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["students"] });
                setIsDeleteDialogOpen(false);
                router.push("/admin/manage-students");
            } else {
                toast.error(res.data.error || "Failed to delete student");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Error deleting student");
            console.error("Delete error:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading student details...</p>
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

    const getInitials = (name) => {
        return name
            ?.split(" ")
            .map((n) => n.charAt(0))
            .join("") || "";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return 0;
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

    return (
        <div className="m-6 md:m-8">
            <div className="space-y-6">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-primary-100 border-primary-200 bg-transparent"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Students
                    </Button>
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/manage-students/${student._id}/edit`}>
                            <Button
                                variant="outline"
                                className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Student
                            </Button>
                        </Link>
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

                {/* Main Content */}
                <div className="rounded-2xl border p-8 bg-gradient-to-br from-white to-gray-50">
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
                                <Badge
                                    variant="outline"
                                    className={`font-medium text-base px-3 py-1 ${student.outstandingAmount == 0
                                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                        : 'bg-orange-100 text-orange-800 border-orange-200'
                                        }`}
                                >
                                    {student.outstandingAmount == 0 ? 'Status: Paid' : 'Status: Unpaid'}
                                </Badge>
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Student Details - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-6 space-y-8">
                                {/* Personal Info */}
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

                                {/* Family Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                            <Users className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <h2 className="text-2xl font-semibold text-gray-900">Family Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Father&apos;s Name</label>
                                            <p className="text-lg text-gray-900 mt-1">{student.fatherName}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Mother&apos;s Name</label>
                                            <p className="text-lg text-gray-900 mt-1">{student.motherName}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-8" />

                                {/* Contact Info */}
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
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Email Address</label>
                                                <div className="flex items-center mt-1">
                                                    <Mail className="w-5 h-5 mr-3 text-blue-500" />
                                                    <p className="text-lg text-gray-900">{student.email || "N/A"}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Student Mobile</label>
                                                <div className="flex items-center mt-1">
                                                    <Phone className="w-5 h-5 mr-3 text-green-500" />
                                                    <p className="text-lg text-gray-900">{student.studentMobile}</p>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Guardian Mobile</label>
                                                <div className="flex items-center mt-1">
                                                    <Phone className="w-5 h-5 mr-3 text-orange-500" />
                                                    <p className="text-lg text-gray-900">{student.guardianMobile || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Current Address</label>
                                                <div className="flex items-start mt-1">
                                                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
                                                    <p className="text-lg text-gray-900">{student.currentAddress}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Permanent Address</label>
                                                <div className="flex items-start mt-1">
                                                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
                                                    <p className="text-lg text-gray-900">{student.permanentAddress}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-8" />

                                {/* Academic Data */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                            <GraduationCap className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <h2 className="text-2xl font-semibold text-gray-900">Academic Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-amber-50 rounded-xl">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Enrolled Course</label>
                                            <p className="text-xl text-gray-900 font-semibold mt-1">{student.course}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Batch Number</label>
                                            <p className="text-lg text-gray-900 mt-1">{student.batchNumber}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Certificate Issued Date</label>
                                            <p className="text-lg text-gray-900 mt-1">{formatDate(student.certificate_issued)}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-8" />

                                {/* Payment Data */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-semibold text-gray-900">Payment Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Course Fee</label>
                                            <p className="text-xl text-gray-900 font-semibold mt-1">{student.courseFee} ৳</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Amount Paid</label>
                                            <p className="text-lg text-gray-900 mt-1">{student.amountPaid} ৳</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Outstanding Amount</label>
                                            <p className="text-lg text-gray-900 mt-1">{student.outstandingAmount} ৳</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Comments</label>
                                            <p className="text-lg text-gray-900 mt-1">{student.comments || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions - Sidebar */}
                    <div className="space-y-4">
                        <Card className="sticky top-20">
                            <CardHeader className="border-b bg-gradient-to-br from-primary-50 to-indigo-50">
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Documents & Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <Link href={`/admin/manage-students/${student._id}/id-card`} className="block">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start h-auto py-4 px-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all group"
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                <IdCard className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="font-semibold text-base">Generate ID Card</div>
                                                <div className="text-xs text-muted-foreground">Create student ID card</div>
                                            </div>
                                        </div>
                                    </Button>
                                </Link>

                                <Link href={`/admin/manage-students/${student._id}/certificate`} className="block">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start h-auto py-4 px-4 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all group"
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                                <GraduationCap className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="font-semibold text-base">Generate Certificate</div>
                                                <div className="text-xs text-muted-foreground">Create course certificate</div>
                                            </div>
                                        </div>
                                    </Button>
                                </Link>

                                <Separator className="my-3" />

                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-2 font-medium">Student Statistics</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Enrollment Date:</span>
                                            <span className="font-medium">{formatDate(student.createdAt)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Duration:</span>
                                            <span className="font-medium">{student.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete
                            <strong className="text-gray-900"> {student.studentName}&apos;s</strong> record
                            and remove their data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="min-w-32"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete Student"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
