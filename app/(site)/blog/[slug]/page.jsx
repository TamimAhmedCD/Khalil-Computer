"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, User, ChevronRight, Share2, Facebook, Twitter, Link2, ArrowLeft } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";

const fetchBlog = async (slug) => {
  const res = await axios.get(`/api/blogs/${slug}`);
  return res.data;
};

const fetchRelatedBlogs = async (blogId) => {
  const res = await axios.get(`/api/blogs/related/${blogId}`);
  return res.data;
};

export default function BlogDetailPage({ params }) {
  const router = useRouter();
  const { slug } = params;

  const { data: blogData, isLoading, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlog(slug),
    enabled: !!slug,
  });

  const blog = blogData?.blog;

  const { data: relatedData } = useQuery({
    queryKey: ["relatedBlogs", blog?._id],
    queryFn: () => fetchRelatedBlogs(blog._id),
    enabled: !!blog?._id,
  });

  const relatedBlogs = relatedData?.relatedBlogs || [];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog?.title || "");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("লিংক কপি করা হয়েছে!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">আর্টিকেল লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">আর্টিকেল পাওয়া যায়নি</p>
          <Button onClick={() => router.push("/blog")}>ব্লগে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600 transition-colors">হোম</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary-600 transition-colors">ব্লগ</Link>
            {blog.categoryName && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/blog?category=${blog.categorySlug}`} className="hover:text-primary-600 transition-colors">
                  {blog.categoryName}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium line-clamp-1">{blog.title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6 -ml-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ব্লগে ফিরে যান
            </Button>

            {/* Category Badge */}
            {blog.categoryName && (
              <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-200">
                {blog.categoryName}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 pb-6 mb-6 border-b border-gray-200">
              {blog.authorName && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary-600" />
                  <span className="font-medium">{blog.authorName}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              {blog.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{blog.readingTime} মিনিট পড়া</span>
                </div>
              )}
              {blog.viewCount !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span>{blog.viewCount} ভিউ</span>
                </div>
              )}
            </div>

            {/* Cover Image */}
            {blog.coverImage && (
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 bg-gray-100">
                <Image
                  src={blog.coverImage}
                  alt={blog.coverImageAlt || blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-primary-50 border-l-4 border-primary-600 rounded-r-lg">
                {blog.excerpt}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {parse(blog.content || "")}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-sm font-semibold text-gray-600">ট্যাগসমূহ:</span>
                {blog.tags.map((tag) => (
                  <Link key={tag._id} href={`/blog/tag/${tag.slug}`}>
                    <Badge variant="outline" className="hover:bg-primary-50 hover:text-primary-700 cursor-pointer">
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t border-b border-gray-200 py-6 mb-12">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600">শেয়ার করুন:</span>
                <Button variant="outline" size="sm" onClick={shareOnFacebook}>
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnTwitter}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" onClick={copyLink}>
                  <Link2 className="w-4 h-4 mr-2" />
                  লিংক কপি
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">সম্পর্কিত আর্টিকেলসমূহ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                  <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
