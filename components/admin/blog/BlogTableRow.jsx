"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2, Star, FileText } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function BlogTableRow({ blog, onDelete, onRefresh }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">প্রকাশিত</Badge>;
      case "draft":
        return <Badge variant="outline" className="text-gray-600">ড্রাফট</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">নির্ধারিত</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const togglePublishStatus = async () => {
    const newStatus = blog.status === "draft" ? "published" : "draft";

    try {
      await axios.post("/api/admin/blogs", {
        _id: blog._id,
        status: newStatus,
      });

      toast.success(`ব্লগ ${newStatus === "published" ? "প্রকাশিত" : "ড্রাফটে"} রূপান্তরিত হয়েছে`, {
        description: `"${blog.title}" এখন ${newStatus === "published" ? "প্রকাশিত" : "ড্রাফট"}`,
      });

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
      toast.error("স্ট্যাটাস পরিবর্তন ব্যর্থ", {
        description: error.response?.data?.error || "আবার চেষ্টা করুন",
      });
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      {/* Thumbnail & Title */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
                📝
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 line-clamp-1 mb-1">{blog.title}</p>
            <p className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-4">
        {blog.categoryName ? (
          <Badge variant="outline" className="text-primary-600 border-primary-200">
            {blog.categoryName}
          </Badge>
        ) : (
          <span className="text-sm text-gray-400">—</span>
        )}
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        {getStatusBadge(blog.status)}
      </td>

      {/* Published Date */}
      <td className="px-4 py-4">
        <span className="text-sm text-gray-600">
          {formatDate(blog.publishedAt || blog.createdAt)}
        </span>
      </td>

      {/* Views */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Eye className="w-4 h-4 text-gray-400" />
          <span>{blog.viewCount || 0}</span>
        </div>
      </td>

      {/* Featured */}
      <td className="px-4 py-4">
        {blog.featured && (
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          {blog.status === "draft" ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePublishStatus}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
              title="প্রকাশ করুন"
            >
              <FileText className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePublishStatus}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              title="ড্রাফটে রূপান্তর করুন"
            >
              <FileText className="w-4 h-4" />
            </Button>
          )}
          <Link href={`/blog/${blog.slug}`} target="_blank">
            <Button variant="ghost" size="sm" title="দেখুন">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={`/admin/manage-blogs/edit/${blog._id}`}>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="সম্পাদনা করুন">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(blog)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            title="ডিলিট করুন"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
