"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search, Filter, ArrowRight, BookOpen, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton, { FeaturedBlogSkeleton } from "@/components/loader/BlogCardSkeleton";
import Link from "next/link";

const fetchBlogs = async (params) => {
  const { page = 1, search = "", category = "", tag = "" } = params || {};
  const url = new URL("/api/blogs", window.location.origin);
  if (page) url.searchParams.append("page", page);
  if (search) url.searchParams.append("search", search);
  if (category) url.searchParams.append("category", category);
  if (tag) url.searchParams.append("tag", tag);

  const res = await axios.get(url.toString());
  return res.data;
};

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", { page, search, category: selectedCategory, tag: selectedTag }],
    queryFn: () => fetchBlogs({ page, search, category: selectedCategory, tag: selectedTag }),
  });

  const blogs = data?.blogs || [];
  const categories = data?.categories || [];
  const tags = data?.tags || [];
  const pagination = data?.pagination || { page: 1, total: 0, pages: 1, limit: 12 };

  // Find featured blog
  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  const regularBlogs = blogs.filter((b) => b._id !== featuredBlog?._id);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryClick = (categorySlug) => {
    setSelectedCategory(categorySlug === selectedCategory ? "all" : categorySlug);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-secondary-400" />
              <span>নিয়মিত টেক এবং ক্যারিয়ার বিষয়ক আর্টিকেল</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              খলিল কম্পিউটার ব্লগ
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
              প্রযুক্তি, ফ্রিল্যান্সিং, প্রোগ্রামিং এবং ক্যারিয়ার গাইডলাইন সম্পর্কিত প্রয়োজনীয় টিপস ও ট্রিকস জানুন।
            </p>

            {/* Search Bar in Hero */}
            <div className="pt-6 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="ব্লগ সার্চ করুন..."
                  value={search}
                  onChange={handleSearch}
                  className="pl-12 pr-4 h-12 rounded-xl bg-white text-gray-900 border-0 shadow-lg focus-visible:ring-2 focus-visible:ring-secondary-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick("all")}
            className="rounded-full"
          >
            সকল ক্যাটাগরি
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat._id}
              variant={selectedCategory === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(cat.slug)}
              className="rounded-full whitespace-nowrap"
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-12">
            <FeaturedBlogSkeleton />
            <BlogCardSkeleton count={6} />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 bg-white rounded-2xl border border-red-100 p-8">
            <p className="text-red-600 font-medium">ব্লগ লোড করতে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।</p>
          </div>
        )}

        {/* Content */}
        {!isLoading && !isError && blogs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">কোনো ব্লগ পাওয়া যায়নি</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              আপনার সার্চ বা ফিল্টারের সাথে মিলে এমন কোনো ব্লগ আর্টিকেল বর্তমানে নেই।
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSelectedTag("all");
              }}
            >
              ফিল্টার রিসেট করুন
            </Button>
          </div>
        )}

        {!isLoading && !isError && blogs.length > 0 && (
          <div className="space-y-12">
            {/* Featured Post (Only on first page and when no search/filters) */}
            {page === 1 && !search && selectedCategory === "all" && featuredBlog && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">ফিচার্ড আর্টিকেল</h2>
                </div>
                <BlogCard blog={featuredBlog} variant="featured" />
              </div>
            )}

            {/* Latest Blogs Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {search ? "সার্চ ফলাফল" : selectedCategory !== "all" ? "ক্যাটাগরির আর্টিকেল" : "সাম্প্রতিক আর্টিকেলসমূহ"}
                </h2>
                <span className="text-sm text-gray-500">
                  মোট {pagination.total} টি আর্টিকেল
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(page === 1 && !search && selectedCategory === "all" ? regularBlogs : blogs).map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  পূর্ববর্তী
                </Button>
                <div className="text-sm font-medium px-4">
                  পৃষ্ঠা {pagination.page} / {pagination.pages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext}
                >
                  পরবর্তী
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
