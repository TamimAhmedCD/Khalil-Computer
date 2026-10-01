"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Users, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import StudentsCard from "@/components/admin/ManageStudent/StudentsCard";
import LoadingSkeleton, { StudentCardSkeleton } from "../../../../components/admin/ManageStudent/Loader";
import Link from "next/link";
import { useState, useEffect, useTransition } from "react";

const fetchStudents = async (params) => {
    const { page = 1, limit = 12, search = "", course = "all", status = "all" } = params;
    const res = await axios.get("/api/admin/students", {
        params: {
            page,
            limit,
            search,
            course,
            status,
        },
    });
    return res.data;
};

export default function StudentList() {
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isPending, startTransition] = useTransition();

    // Debounce search input by 300ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
            setCurrentPage(1); // Reset page on new search term
        }, 300);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["students", currentPage, itemsPerPage, debouncedSearch, selectedCourse, selectedStatus],
        queryFn: () =>
            fetchStudents({
                page: currentPage,
                limit: itemsPerPage,
                search: debouncedSearch,
                course: selectedCourse,
                status: selectedStatus,
            }),
        placeholderData: keepPreviousData, // React Query v5 proper keepPreviousData!
    });

    const handleCourseChange = (value) => {
        setSelectedCourse(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchInput("");
        setDebouncedSearch("");
        setSelectedCourse("all");
        setSelectedStatus("all");
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        startTransition(() => {
            setCurrentPage(newPage);
        });
    };

    const students = data?.students || [];
    const pagination = data?.pagination || { page: 1, limit: 12, total: 0, pages: 1 };
    const hasActiveFilters = searchInput || selectedCourse !== "all" || selectedStatus !== "all";

    // Only show full loading skeleton on FIRST ever mount with no data
    if (isLoading && !data) return <LoadingSkeleton />;

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
                        <Button className="bg-primary-700 hover:bg-primary-800/90 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Student
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Controls Section - Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search by name, ID number, email, or mobile..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                        <Select value={selectedCourse} onValueChange={handleCourseChange}>
                            <SelectTrigger className="w-48">
                                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                <SelectValue placeholder="Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                <SelectItem value="Web Design">Web Design</SelectItem>
                                <SelectItem value="Graphics Design">Graphics Design</SelectItem>
                                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                                <SelectItem value="Basic Computer">Basic Computer</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={selectedStatus} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={itemsPerPage.toString()}
                            onValueChange={(val) => {
                                setItemsPerPage(Number(val));
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-28">
                                <SelectValue placeholder="Per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="6">6 / page</SelectItem>
                                <SelectItem value="12">12 / page</SelectItem>
                                <SelectItem value="24">24 / page</SelectItem>
                                <SelectItem value="48">48 / page</SelectItem>
                            </SelectContent>
                        </Select>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                onClick={handleClearFilters}
                                className="text-gray-500 hover:text-gray-700 h-10 px-3"
                            >
                                <X className="w-4 h-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Total Count Info */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>
                        Showing {students.length} of {pagination.total} students
                    </span>
                    {isFetching && (
                        <span className="flex items-center gap-1.5 text-blue-600 text-xs font-medium">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Searching...
                        </span>
                    )}
                </div>

                {/* Students Grid */}
                <div className={`relative transition-opacity duration-200 ${isFetching ? "opacity-70" : "opacity-100"}`}>
                    {isError ? (
                        <div className="text-center py-12 text-red-500">
                            Failed to load students. Please refresh or try again later.
                        </div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-16 border rounded-xl bg-gray-50/50">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No students found</h3>
                            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                                {hasActiveFilters
                                    ? "Try adjusting your search criteria or filters."
                                    : "No students have been added yet."}
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    variant="outline"
                                    onClick={handleClearFilters}
                                    className="mt-4"
                                >
                                    Clear all filters
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {students.map((student) => (
                                <Link
                                    key={student._id || student.idNumber}
                                    href={`/admin/manage-students/${student?._id}`}
                                    className="transition-transform hover:-translate-y-1 block"
                                >
                                    <StudentsCard student={student} />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {pagination.pages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <div className="text-sm text-gray-600">
                            Page {pagination.page} of {pagination.pages}
                        </div>
                        <div className="flex items-center gap-2">
                            {/* First Page */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1 || isPending}
                                className="h-9 w-9"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>

                            {/* Previous Page */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!pagination.hasPrev || isPending}
                                className="h-9 w-9"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {/* Page Numbers */}
                            <div className="flex gap-1">
                                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                                    let pageNum;
                                    if (pagination.pages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= pagination.pages - 2) {
                                        pageNum = pagination.pages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNum)}
                                            disabled={isPending}
                                            className={`h-9 w-9 ${
                                                currentPage === pageNum
                                                    ? "bg-primary-700 hover:bg-primary-800 text-white"
                                                    : ""
                                            }`}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            {/* Next Page */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={!pagination.hasNext || isPending}
                                className="h-9 w-9"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>

                            {/* Last Page */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(pagination.pages)}
                                disabled={currentPage === pagination.pages || isPending}
                                className="h-9 w-9"
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
