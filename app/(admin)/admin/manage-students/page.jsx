"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentsCard from "@/components/admin/ManageStudent/StudentsCard";
import LoadingSkeleton from "../../../../components/admin/ManageStudent/Loader";
import Link from "next/link";

const fetchStudents = async () => {
    const res = await axios.get("/api/admin/students");
    return res.data;
};
export default function StudentList() {
    const { data: students, isLoading } = useQuery({
        queryKey: ["students"],
        queryFn: fetchStudents,
    });

    if (isLoading) return <LoadingSkeleton />
    return (
        <Card className="m-6 md:m-8">
            {/* Header Section */}
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <AdminCardHeader
                        title="Student Directory"
                        description="Manage and view all registered students in your institution"
                    />
                    <Link href="/admin/add-student">
                        <Button className="bg-primary-700 hover:bg-primary-800/90">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Student
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Controls Section */}
                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search by name, email, or course..."
                            className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select>
                            <SelectTrigger className="w-48">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                <SelectItem value="Web Design">Web Design</SelectItem>
                                <SelectItem value="Graphics Design">Graphics Design</SelectItem>
                                <SelectItem value="Digital Marketing">
                                    Digital Marketing
                                </SelectItem>
                                <SelectItem value="Basic Computer">Basic Computer</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            {/* Students Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-6">
                {students.map((student) => (
                    <Link key={student.idNumber} href={`manage-students/${student?._id}`}><StudentsCard student={student} /></Link>
                ))}
            </div>
        </Card>
    );
}
