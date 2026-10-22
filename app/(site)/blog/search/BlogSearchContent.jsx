"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, ChevronLeft } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/loader/BlogCardSkeleton";

const fetchSearchResults = async (searchQuery) => {
  if (!searchQuery.trim()) return { blogs: [], pagination: { page: 1, pages: 0, total: 0 } };

  const res = await axios.get("/api/blogs", {
    params: { search: searchQuery },
  });
  return res.data;
};

export default function BlogSearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  const {
    data: searchData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blog-search", query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query.trim(),
  });

  const searchResults = searchData?.blogs || [];
  const searchCount = searchData?.pagination?.total || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/blog/search?q=${encodeURIComponent(searchInput.trim())}`;
    }
  };

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  return (
    <div className="m-6 md:m-8 min-h-screen">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/blog">
          <ChevronLeft className="w-4 h-4 mr-2" />
          ব্লগে ফিরে যান
        </Link>
      </Button>

      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">ব্লগ সার্চ</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="ব্লগের শিরোনাম বা বিষয়বস্তু সার্চ করুন..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-2 text-lg border-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
              disabled={!searchInput.trim()}
            >
              সার্চ করুন
            </Button>
          </div>
        </form>

        {/* Search Results Summary */}
        {query && (
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 text-base">
              {searchCount} টি ফলাফল
            </Badge>
            <span className="text-muted-foreground">
              <strong className="font-semibold">"{query}"</strong> এর জন্য
            </span>
          </div>
        )}
      </div>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          হোম
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">
          ব্লগ
        </Link>
        <span>/</span>
        <span className="text-primary">সার্চ</span>
        {query && (
          <>
            <span>/</span>
            <span className="text-primary font-medium line-clamp-1 max-w-xs">
              "{query}"
            </span>
          </>
        )}
      </nav>

      {/* Search Results */}
      {!query ? (
        <div className="flex flex-col items-center justify-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">ব্লগ সার্চ করুন</h3>
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            আপনার পছন্দের ব্লগ খুঁজে পেতে শিরোনাম, বিষয়বস্তু, বা ক্যাটাগরি লিখে সার্চ করুন
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => setSearchInput("কম্পিউটার")}>
              কম্পিউটার
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSearchInput("প্রোগ্রামিং")}>
              প্রোগ্রামিং
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSearchInput("ওয়েব ডেভেলপমেন্ট")}>
              ওয়েব ডেভেলপমেন্ট
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSearchInput("সফটওয়্যার")}>
              সফটওয়্যার
            </Button>
          </div>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold mb-2">সার্চ ফলাফল লোড করতে ব্যর্থ</h3>
          <p className="text-muted-foreground mb-6">
            অনুগ্রহ করে আবার চেষ্টা করুন
          </p>
          <Button onClick={() => refetch()}>
            পুনরায় চেষ্টা করুন
          </Button>
        </div>
      ) : searchCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">কোনো ফলাফল পাওয়া যায়নি</h3>
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            <strong>"{query}"</strong> এর জন্য কোনো ব্লগ পাওয়া যায়নি। অন্য কোনো বিষয় সার্চ করুন
          </p>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/blog">সমস্ত ব্লগ দেখুন</Link>
            </Button>
            <Button onClick={() => setSearchInput("")}>
              নতুন সার্চ
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {searchData?.pagination?.pages > 1 && (
            <div className="flex items-center justify-center mt-12">
              <p className="text-muted-foreground">
                দেখানো হচ্ছে {searchCount} টি ব্লগের মধ্যে ১-{Math.min(searchResults.length, searchCount)} টি
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
