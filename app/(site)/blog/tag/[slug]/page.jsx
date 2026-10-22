import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Hash } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { fetchBlogsByTag, fetchTagBySlug } from "@/lib/blogHelpers";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const tag = await fetchTagBySlug(slug);

  if (!tag) {
    return {
      title: "ট্যাগ পাওয়া যায়নি",
      description: "এই ট্যাগটি পাওয়া যায়নি",
    };
  }

  return {
    title: `${tag.name} - ব্লগ`,
    description: `${tag.name} ট্যাগের সাথে যুক্ত ব্লগ আর্টিকেল`,
    openGraph: {
      title: `${tag.name} - ব্লগ`,
      description: `${tag.name} ট্যাগের সাথে যুক্ত ব্লগ আর্টিকেল`,
      type: "article",
      url: `/blog/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params }) {
  const { slug } = params;
  const tag = await fetchTagBySlug(slug);

  if (!tag) {
    return notFound();
  }

  const blogsData = await fetchBlogsByTag(slug);
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
        <div className="flex items-center gap-3 mb-4">
          <Hash className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">{tag.name}</h1>
        </div>
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
        <span className="text-primary">#{tag.name}</span>
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
          <h3 className="text-xl font-semibold mb-2">
            #{tag.name} ট্যাগে এখনো কোনো ব্লগ নেই
          </h3>
          <p className="text-muted-foreground mb-6">
            এই ট্যাগ সহ প্রথম ব্লগটি যুক্ত করুন
          </p>
          <Button asChild>
            <Link href="/blog">ব্লগ তালিকা দেখুন</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
