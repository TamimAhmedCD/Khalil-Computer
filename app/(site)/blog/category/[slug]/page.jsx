import Link from "next/link";
import { notFound } from "next/navigation";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock, Eye } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { fetchBlogsByCategory, fetchCategoryBySlug } from "@/lib/blogHelpers";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি",
      description: "এই ক্যাটাগরিটি পাওয়া যায়নি",
    };
  }

  return {
    title: `${category.name} - ব্লগ`,
    description: category.description || `${category.name} ক্যাটাগরির ব্লগ আর্টিকেল`,
    openGraph: {
      title: `${category.name} - ব্লগ`,
      description: category.description || `${category.name} ক্যাটাগরির ব্লগ আর্টিকেল`,
      type: "article",
      url: `/blog/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    return notFound();
  }

  const blogsData = await fetchBlogsByCategory(slug);
  const blogs = blogsData.blogs || [];

  return (
    <div className="m-6 md:m-8 min-h-screen">
      {/* Hero Section */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog">
            <ChevronLeft className="w-4 h-4 mr-2" />
            ব্লগে ফিরে যান
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground max-w-3xl">{category.description}</p>
        )}
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="outline" className="px-3 py-1">
            {blogs.length} টি ব্লগ
          </Badge>
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          হোম
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">
          ব্লগ
        </Link>
        <span>/</span>
        <span className="text-primary">{category.name}</span>
      </nav>

      {/* Blog Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">এই ক্যাটাগরিতে এখনো কোনো ব্লগ নেই</h3>
          <p className="text-muted-foreground mb-6">
            এই ক্যাটাগরিতে প্রথম ব্লগটি যুক্ত করুন
          </p>
          <Button asChild>
            <Link href="/blog">ব্লগ তালিকা দেখুন</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
