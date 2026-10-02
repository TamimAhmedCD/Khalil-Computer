'use client'

import AllCourse from "@/components/admin/course/all-course";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const fetchCourses = async (params) => {
  const { page = 1, search = "", category = "", published = "" } = params || {};
  const url = new URL('/api/admin/courses', window.location.origin);
  if (page) url.searchParams.append('page', page);
  if (search) url.searchParams.append('search', search);
  if (category) url.searchParams.append('category', category);
  if (published) url.searchParams.append('published', published);

  const res = await axios.get(url.toString());
  return res.data;
}

export default function ManageCourse() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const {
    data: coursesData,
    isLoading,
    isError,
    refetch,
    isPreviousData
  } = useQuery({
    queryKey: ["courses", { page, search, category, published }],
    queryFn: () => fetchCourses({ page, search, category, published }),
    placeholderData: (previousData) => previousData,
  });

  const courses = coursesData?.courses || [];
  const pagination = coursesData?.pagination || { page: 1, total: 0, pages: 1, limit: 12 };

  const openDeleteDialog = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await axios.delete(`/api/admin/courses/${courseToDelete._id}`);

      toast.success("Course Deleted Successfully", {
        description: `"${courseToDelete.title}" has been permanently deleted.`,
      });

      refetch();

    } catch (error) {
      console.error("Failed to delete course:", error);

      toast.error("Delete Failed", {
        description: "Failed to delete course. Please try again later.",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  const handleCategoryFilter = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handlePublishedFilter = (value) => {
    setPublished(value);
    setPage(1);
  };

  if (isLoading && !isPreviousData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="m-6 md:m-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <AdminCardHeader title='Course Management' description='View all courses, edit and add new courses' />
          <Button asChild className="bg-primary-600 hover:bg-primary-700">
            <Link href="/admin/add-course">
              <Plus className="h-4 w-4 mr-2" />
              Add New Course
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses by title, description, or category..."
                className="pl-10"
                value={search}
                onChange={handleSearch}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {published === "" ? "All" : published === "true" ? "Published" : "Draft"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handlePublishedFilter("")}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePublishedFilter("true")}>
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePublishedFilter("false")}>
                    Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Category: {category === "" ? "All" : category}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("")}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("Web Development")}>
                    Web Development
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("Graphics Design")}>
                    Graphics Design
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("Digital Marketing")}>
                    Digital Marketing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("Computer Basics")}>
                    Computer Basics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("Programming")}>
                    Programming
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("Data Entry")}>
                    Data Entry
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCategoryFilter("Others")}>
                    Others
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Course Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isError ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        Failed to load courses
                      </td>
                    </tr>
                  ) : courses.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        No courses found
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <AllCourse key={course._id} course={course} openDeleteDialog={openDeleteDialog} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} courses
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev || isPreviousData}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="text-sm font-medium">
                  Page {pagination.page} of {pagination.pages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext || isPreviousData}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>"{courseToDelete?.title}"</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCourse}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
