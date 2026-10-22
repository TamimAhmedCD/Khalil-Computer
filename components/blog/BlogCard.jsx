"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Calendar, User } from "lucide-react";

export default function BlogCard({ blog, variant = "default" }) {
  if (!blog) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isFeatured = variant === "featured" || blog.featured;

  if (isFeatured) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Cover Image */}
          <div className="relative h-64 lg:h-full min-h-[280px] rounded-xl overflow-hidden bg-gray-100">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.coverImageAlt || blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary-50 to-primary-100">
                <span className="text-4xl">📝</span>
              </div>
            )}
            {blog.featured && (
              <Badge className="absolute top-4 left-4 bg-primary-600 hover:bg-primary-700 text-white">
                ফিচার্ড
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Category */}
              {blog.categoryName && (
                <Badge variant="outline" className="text-primary-600 border-primary-200">
                  {blog.categoryName}
                </Badge>
              )}

              {/* Title */}
              <Link href={`/blog/${blog.slug}`}>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-gray-600 line-clamp-3">
                {blog.excerpt}
              </p>
            </div>

            {/* Meta Information */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                {blog.authorName && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-primary-500" />
                    <span>{blog.authorName}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {blog.readingTime && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{blog.readingTime} মিনিট পড়া</span>
                  </div>
                )}
                {blog.viewCount !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span>{blog.viewCount} ভিউ</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Card
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.coverImageAlt || blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary-50 to-primary-100">
            <span className="text-3xl">📝</span>
          </div>
        )}
        {blog.categoryName && (
          <Badge className="absolute top-3 left-3 bg-white/90 text-primary-700 hover:bg-white border-0 shadow-sm backdrop-blur-sm">
            {blog.categoryName}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <Link href={`/blog/${blog.slug}`}>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {blog.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {blog.excerpt}
          </p>
        </div>

        {/* Meta Information */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
          </div>

          <div className="flex items-center gap-3">
            {blog.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{blog.readingTime} মিনিট</span>
              </div>
            )}
            {blog.viewCount !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span>{blog.viewCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
