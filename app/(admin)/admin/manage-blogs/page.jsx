"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import BlogTableRow from "@/components/admin/blog/BlogTableRow";

const fetchBlogs = async (params) => {
  const { page = 1, search = "", status = "", category = "", featured = "" } = params || {};
  const url = new URL("/api/admin/blogs", window.location.origin);
  if (page) url.searchParams.append("page", page);
  if (search) url.searchParams.append("search", search);
  if (status) url.searchParams.append("status", status);
  if (category) url.searchParams.append("category", category);
  if (featured) url.searchParams.append("featured", featured);

  const res = await axios.get(url.toString());
  return res.data;
};

export default function ManageBlogs() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const {
    data: blogsData,
    isLoading,
    isError,
    refetch,
    isPreviousData,
  } = useQuery({
    queryKey: ["admin-blogs", { page, search, status, category, featured }],
    queryFn: () => fetchBlogs({ page, search, status, category, featured }),
    placeholderData: (previousData) => previousData,
  });

  const blogs = blogsData?.blogs || [];
  const pagination = blogsData?.pagination || { page: 1, total: 0, pages: 1, limit: 12 };

  const openDeleteDialog = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;

    try {
      await axios.delete(`/api/admin/blogs/${blogToDelete._id}`);

      toast.success("ব্লগ ডিলিট সফল", {
        description: `"${blogToDelete.title}" স্থায়ীভাবে ডিলিট করা হয়েছে।`,
      });

      refetch();
    } catch (error) {
      console.error("Failed to delete blog:", error);

      toast.error("ডিলিট ব্যর্থ", {
        description: "ব্লগ ডিলিট করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।",
      });
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatus(value);
    setPage(1);
  };

  const handleFeaturedFilter = (value) => {
    setFeatured(value);
    setPage(1);
  };

  if (isLoading && !isPreviousData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p>ব্লগ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-6 md:m-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <AdminCardHeader
            title="ব্লগ ম্যানেজমেন্ট"
            description="সকল ব্লগ আর্টিকেল দেখুন, সম্পাদনা করুন এবং নতুন যুক্ত করুন"
          />
          <Button asChild className="bg-primary-600 hover:bg-primary-700">
            <Link href="/admin/manage-blogs/add">
              <Plus className="h-4 w-4 mr-2" />
              নতুন ব্লগ যুক্ত করুন
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="শিরোনাম বা বিষয়বস্তু দিয়ে সার্চ করুন..."
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
                    স্ট্যাটাস: {status === "" ? "সকল" : status === "published" ? "প্রকাশিত" : status === "draft" ? "ড্রাফট" : "নির্ধারিত"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusFilter("")}>
                    সকল
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter("published")}>
                    প্রকাশিত
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter("draft")}>
                    ড্রাফট
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter("scheduled")}>
                    নির্ধারিত
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    ফিচার্ড: {featured === "" ? "সকল" : featured === "true" ? "হ্যাঁ" : "না"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleFeaturedFilter("")}>
                    সকল
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeaturedFilter("true")}>
                    শুধু ফিচার্ড
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFeaturedFilter("false")}>
                    নন-ফিচার্ড
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ব্লগ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ক্যাটাগরি</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">তারিখ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ভিউ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ফিচার্ড</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {isError ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        ব্লগ লোড করতে ব্যর্থ
                      </td>
                    </tr>
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        কোনো ব্লগ পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <BlogTableRow key={blog._id} blog={blog} onDelete={openDeleteDialog} onRefresh={refetch} />
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
                দেখানো হচ্ছে {((pagination.page - 1) * pagination.limit) + 1} থেকে {Math.min(pagination.page * pagination.limit, pagination.total)} মোট {pagination.total} টির মধ্যে
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev || isPreviousData}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  পূর্ববর্তী
                </Button>
                <div className="text-sm font-medium">
                  পৃষ্ঠা {pagination.page} / {pagination.pages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext || isPreviousData}
                >
                  পরবর্তী
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
            <DialogTitle>ব্লগ ডিলিট করবেন?</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত যে <strong>"{blogToDelete?.title}"</strong> ডিলিট করতে চান? এই কাজটি ফেরত নেওয়া যাবে না।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              বাতিল
            </Button>
            <Button variant="destructive" onClick={handleDeleteBlog}>
              ডিলিট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
