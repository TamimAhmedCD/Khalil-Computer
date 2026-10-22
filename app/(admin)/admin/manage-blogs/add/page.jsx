"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";
import TinyMCEEditor from "@/components/admin/blog/TinyMCEEditor";
import { slugify } from "@/lib/slugify";

// Define Zod schema for form validation
const blogFormSchema = z.object({
  title: z.string().min(5, { message: "শিরোনাম কমপক্ষে ৫ অক্ষর হতে হবে" }),
  slug: z.string().min(3, { message: "স্লাগ কমপক্ষে ৩ অক্ষর হতে হবে" }),
  excerpt: z.string().min(10, { message: "সারাংশ কমপক্ষে ১০ অক্ষর হতে হবে" }),
  content: z.string().min(20, { message: "বিস্তারিত বর্ণনা কমপক্ষে ২০ অক্ষর হতে হবে" }),
  categoryId: z.string().min(1, { message: "ক্যাটাগরি নির্বাচন করুন" }),
  tags: z.array(z.string()).optional(),
  coverImage: z.any().optional(),
  status: z.string().optional(),
  publishedAt: z.string().optional(),
  featured: z.boolean().optional(),
  coverImageAlt: z.string().optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }).optional(),
});

export default function AddEditBlogPage({ params }) {
  const router = useRouter();
  const isEdit = params.id !== "add";
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [generatingSlug, setGeneratingSlug] = useState(false);

  // Fetch categories and tags
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catsRes, tagsRes] = await Promise.all([
          axios.get("/api/admin/blog-categories?status=active"),
          axios.get("/api/admin/blog-tags"),
        ]);
        setCategories(catsRes.data.categories || []);
        setTags(tagsRes.data.tags || []);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  // Get existing blog data if editing
  useEffect(() => {
    if (isEdit) {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`/api/admin/blogs/${params.id}`);
          const blog = res.data.blog;
          if (blog) {
            // Set form values
            methods.setValue("title", blog.title);
            methods.setValue("slug", blog.slug);
            methods.setValue("excerpt", blog.excerpt);
            methods.setValue("content", blog.content);
            methods.setValue("categoryId", blog.categoryId);
            methods.setValue("tags", blog.tagIds || []);
            methods.setValue("coverImageAlt", blog.coverImageAlt || "");
            methods.setValue("status", blog.status);
            methods.setValue("publishedAt", blog.publishedAt?.split("T")[0] || "");
            methods.setValue("featured", blog.featured || false);
            methods.setValue("seo.metaTitle", blog.seo?.metaTitle || "");
            methods.setValue("seo.metaDescription", blog.seo?.metaDescription || "");
            if (blog.coverImage) {
              setCoverImagePreview(blog.coverImage);
            }
          }
        } catch (error) {
          console.error("Failed to fetch blog:", error);
        }
      };
      fetchBlog();
    }
  }, [isEdit, params.id]);

  const methods = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      categoryId: "",
      tags: [],
      coverImage: null,
      status: "draft",
      publishedAt: "",
      featured: false,
      coverImageAlt: "",
      seo: {
        metaTitle: "",
        metaDescription: "",
      },
    },
    mode: "onChange",
  });

  // Watch title changes to auto-generate slug
  const title = methods.watch("title");
  useEffect(() => {
    if (title && !methods.getValues("slug")) {
      // Generate slug from title when slug is empty
      const generatedSlug = title.toLowerCase().trim()
        .replace(/[ঀ-৿]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");

      if (generatedSlug) {
        methods.setValue("slug", generatedSlug, { shouldValidate: true });
      }
    }
  }, [title, methods]);

  const { formState, setValue, trigger } = methods;

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ছবি খুব বড়!", { description: "ছবি ৫MB এর কম হতে হবে" });
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("অবৈধ ফাইল", { description: "শুধু ছবি ফাইল আপলোড করুন" });
        return;
      }

      setValue("coverImage", file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTabChange = async (value) => {
    // Basic validation before moving forward
    if (value === "content" && activeTab === "basic-info") {
      const isValid = await trigger(["title", "slug", "excerpt", "categoryId"]);
      if (!isValid) return;
    }
    if (value === "seo" && activeTab === "content") {
      const isValid = await trigger(["content"]);
      if (!isValid) return;
    }
    setActiveTab(value);
  };

  const goToNextTab = () => {
    if (activeTab === "basic-info") handleTabChange("content");
    else if (activeTab === "content") handleTabChange("seo");
  };

  const goToPrevTab = () => {
    if (activeTab === "seo") setActiveTab("content");
    else if (activeTab === "content") setActiveTab("basic-info");
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "tags" && Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key].map(id => ({ _id: id }))));
        } else if (key === "seo" && typeof data[key] === "object") {
          formData.append("seo", JSON.stringify(data[key]));
        } else if (key === "coverImage" && data[key] instanceof File) {
          formData.append("coverImage", data[key]);
          formData.append("coverImageAlt", data.coverImageAlt || "");
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      if (isEdit) {
        formData.append("_id", params.id);
        formData.append("oldCoverImage", coverImagePreview || "");
      }

      await axios.post("/api/admin/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsSuccess(true);
      toast.success(isEdit ? "ব্লগ আপডেট সফল" : "ব্লগ যুক্ত সফল", {
        description: isEdit ? "ব্লগ সফলভাবে আপডেট হয়েছে" : "নতুন ব্লগ সফলভাবে যুক্ত হয়েছে",
      });

      setTimeout(() => {
        setIsSuccess(false);
        router.push("/admin/manage-blogs");
      }, 2000);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("সাবমিশন ব্যর্থ", {
        description: error.response?.data?.error || "ব্লগ যুক্ত করতে সমস্যা হয়েছে",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] p-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">
          {isEdit ? "ব্লগ সফলভাবে আপডেট হয়েছে!" : "ব্লগ সফলভাবে যুক্ত হয়েছে!"}
        </h2>
        <p className="text-muted-foreground mb-6">
          আপনার ব্লগ সিস্টেমে সফলভাবে যুক্ত/আপডেট হয়েছে
        </p>
        <div className="flex gap-4">
          <Button onClick={() => router.push("/admin/manage-blogs")}>
            ব্লগ তালিকা দেখুন
          </Button>
          {!isEdit && (
            <Button variant="outline" onClick={() => router.push("/admin/manage-blogs/add")}>
              নতুন ব্লগ যুক্ত করুন
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="m-6 md:m-8">
      <FormProvider {...methods}>
        <div className="container mx-auto py-6">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                {isEdit ? "ব্লগ সম্পাদনা করুন" : "নতুন ব্লগ যুক্ত করুন"}
              </CardTitle>
              <CardDescription>
                আপনার ব্লগের সকল প্রয়োজনীয় তথ্য পূরণ করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="basic-info">মূল তথ্য</TabsTrigger>
                  <TabsTrigger value="content">কন্টেন্ট</TabsTrigger>
                  <TabsTrigger value="seo">SEO এবং সেটিংস</TabsTrigger>
                </TabsList>

                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  {/* Tab 1: Basic Info */}
                  <TabsContent value="basic-info" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">শিরোনাম *</label>
                        <Input
                          placeholder="ব্লগের শিরোনাম"
                          {...methods.register("title")}
                          onChange={(e) => {
                            // Call onChange of React Hook Form
                            methods.register("title").onChange(e);

                            // Auto-generate slug when title changes using AI
                            const title = e.target.value.trim();
                            if (title) {
                              const currentSlug = methods.getValues("slug");
                              // Only auto-generate if slug field is empty
                              if (!currentSlug || currentSlug === "" || currentSlug === "auto-generated") {
                                // Call AI API for SEO-optimized slug
                                axios.post("/api/ai/blog-helper", {
                                  action: "generateSeoSlug",
                                  data: { title: title },
                                })
                                  .then((response) => {
                                    if (response.data.success && response.data.result) {
                                      methods.setValue("slug", response.data.result, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                    } else {
                                      // Fallback to slugify
                                      const fallbackSlug = slugify(title);
                                      methods.setValue("slug", fallbackSlug, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                    }
                                  })
                                  .catch((error) => {
                                    console.error("AI slug generation failed, using fallback");
                                    const fallbackSlug = slugify(title);
                                    methods.setValue("slug", fallbackSlug, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                  });
                              }
                            }
                          }}
                        />
                        {formState.errors.title && (
                          <p className="text-sm text-red-500">{formState.errors.title.message}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          শিরোনাম লিখার পর স্বয়ংক্রিয়ভাবে SEO-optimized slug তৈরি হবে
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">স্লাগ *</label>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="auto-generated"
                            {...methods.register("slug")}
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              const title = methods.getValues("title");
                              if (!title) {
                                toast.error("শিরোনাম প্রয়োজন", {
                                  description: "স্লাগ জেনারেটের জন্য শিরোনাম প্রয়োজন",
                                });
                                return;
                              }

                              setGeneratingSlug(true);
                              try {
                                // Call AI API for SEO-optimized slug
                                const response = await axios.post("/api/ai/blog-helper", {
                                  action: "generateSeoSlug",
                                  data: { title: title },
                                });

                                if (response.data.success && response.data.result) {
                                  const aiSlug = response.data.result;
                                  console.log("AI SEO Slug generated:", aiSlug);
                                  methods.setValue("slug", aiSlug, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                  toast.success("SEO-optimized Slug তৈরি হয়েছে!", {
                                    description: "AI দিয়ে SEO-friendly slug তৈরি করা হয়েছে",
                                  });
                                } else {
                                  // Fallback to basic slugify
                                  const generatedSlug = slugify(title);
                                  console.log("AI failed, using slugify fallback:", generatedSlug);
                                  methods.setValue("slug", generatedSlug, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                  toast.success("Slug তৈরি হয়েছে!", {
                                    description: "AI উপলব্ধ নেই, সাধারণ slug ব্যবহার করা হয়েছে",
                                  });
                                }
                              } catch (error) {
                                console.error("AI Slug generation error:", error);
                                // Fallback to basic slugify on error
                                const generatedSlug = slugify(title);
                                console.log("Error fallback, using slugify:", generatedSlug);
                                methods.setValue("slug", generatedSlug, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                toast.success("Slug তৈরি হয়েছে!", {
                                  description: "AI সেবা উপলব্ধ না থাকায় সাধারণ slug ব্যবহার করা হয়েছে",
                                });
                              } finally {
                                setGeneratingSlug(false);
                              }
                            }}
                            disabled={generatingSlug}
                            className="text-xs gap-1"
                          >
                            {generatingSlug ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3 h-3" />
                                Generate Slug
                              </>
                            )}
                          </Button>
                        </div>
                        {formState.errors.slug && (
                          <p className="text-sm text-red-500">{formState.errors.slug.message}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          URL-এর জন্য SEO-optimized slug। শিরোনাম লিখলে স্বয়ংক্রিয়ভাবে তৈরি হবে
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">সারাংশ *</label>
                      <Textarea
                        placeholder="সংক্ষিপ্ত বিবরণ (১৫০ অক্ষরের মধ্যে)"
                        rows={4}
                        {...methods.register("excerpt")}
                      />
                      {formState.errors.excerpt && (
                        <p className="text-sm text-red-500">{formState.errors.excerpt.message}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        এই সারাংশ সার্চ ইঞ্জিনে এবং সামাজিক মিডিয়াতে প্রদর্শিত হবে
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">ক্যাটাগরি *</label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...methods.register("categoryId")}
                      >
                        <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {formState.errors.categoryId && (
                        <p className="text-sm text-red-500">{formState.errors.categoryId.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">ট্যাগসমূহ</label>
                      <div className="space-y-2">
                        {/* Display selected tags */}
                        <div className="flex flex-wrap gap-2 mb-2 min-h-10 border border-input rounded-md p-2 bg-background">
                          {methods.watch("tags")?.map((tagId) => {
                            const tag = tags.find(t => t._id === tagId);
                            if (!tag) return null;
                            return (
                              <div
                                key={tag._id}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                              >
                                {tag.name}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentTags = methods.getValues("tags") || [];
                                    methods.setValue(
                                      "tags",
                                      currentTags.filter(id => id !== tag._id)
                                    );
                                  }}
                                  className="ml-1 text-primary hover:text-primary/70"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                          {(!methods.watch("tags") || methods.watch("tags").length === 0) && (
                            <span className="text-sm text-muted-foreground italic">কোনো ট্যাগ নির্বাচন করা হয়নি</span>
                          )}
                        </div>

                        {/* Tag selection or creation */}
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              value=""
                              onChange={(e) => {
                                const tagId = e.target.value;
                                if (tagId) {
                                  const currentTags = methods.getValues("tags") || [];
                                  if (!currentTags.includes(tagId)) {
                                    methods.setValue("tags", [...currentTags, tagId]);
                                  }
                                  e.target.value = "";
                                }
                              }}
                            >
                              <option value="">ট্যাগ সিলেক্ট করুন...</option>
                              {tags.map((tag) => (
                                <option key={tag._id} value={tag._id}>
                                  {tag.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* New tag input section */}
                          <div className="flex gap-2">
                            <Input
                              placeholder="নতুন ট্যাগের নাম (কমা দিয়ে একাধিক ট্যাগ আলাদা করুন)"
                              id="newTagName"
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                const newTagInput = document.getElementById("newTagName");
                                const tagInput = newTagInput?.value?.trim();

                                if (!tagInput) {
                                  toast.error("ট্যাগের নাম লিখুন");
                                  return;
                                }

                                // Split by comma and trim each tag
                                const tagNames = tagInput.split(',').map(name => name.trim()).filter(name => name.length > 0);

                                if (tagNames.length === 0) {
                                  toast.error("ট্যাগের নাম লিখুন");
                                  return;
                                }

                                try {
                                  const createdTags = [];
                                  const currentTags = methods.getValues("tags") || [];
                                  const updatedTags = [...currentTags];
                                  const updatedTagList = [...tags];

                                  // Create each tag individually
                                  for (const tagName of tagNames) {
                                    const response = await axios.post("/api/admin/blog-tags", {
                                      name: tagName,
                                    });
                                    const newTag = response.data;

                                    // Add to created tags list
                                    createdTags.push(newTag);

                                    // Add to state
                                    if (!updatedTags.includes(newTag._id)) {
                                      updatedTags.push(newTag._id);
                                    }

                                    // Add to tags list for dropdown
                                    updatedTagList.push(newTag);
                                  }

                                  // Update state
                                  setTags(updatedTagList);
                                  methods.setValue("tags", updatedTags);

                                  // Clear the input field
                                  if (newTagInput) {
                                    newTagInput.value = "";
                                  }

                                  if (tagNames.length === 1) {
                                    toast.success("নতুন ট্যাগ যুক্ত হয়েছে");
                                  } else {
                                    toast.success(`${tagNames.length} টি ট্যাগ যুক্ত হয়েছে`);
                                  }
                                } catch (error) {
                                  toast.error("ট্যাগ যুক্ত করতে ব্যর্থ");
                                }
                              }}
                            >
                              নতুন ট্যাগ তৈরি করুন
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          ট্যাগ সিলেক্ট করতে ড্রপডাউন থেকে নির্বাচন করুন অথবা নতুন ট্যাগ তৈরি করুন
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab 2: Content */}
                  <TabsContent value="content" className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">কভার ছবি</label>
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="w-full md:w-80 h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          {coverImagePreview ? (
                            <img
                              src={coverImagePreview}
                              alt="Cover preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              কোনো ছবি নেই
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="text-sm"
                          />
                          <Input
                            placeholder="ছবির বিবরণ (Alt text)"
                            {...methods.register("coverImageAlt")}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        পাওয়ার্ড ছবি: ১৬:৯ অনুপাত, সর্বোচ্চ ৫MB
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">বিস্তারিত বর্ণনা *</label>
                      <TinyMCEEditor
                        value={methods.watch("content")}
                        onChange={(content) => setValue("content", content, { shouldValidate: true })}
                      />
                      {formState.errors.content && (
                        <p className="text-sm text-red-500">{formState.errors.content.message}</p>
                      )}
                    </div>
                  </TabsContent>

                  {/* Tab 3: SEO & Settings */}
                  <TabsContent value="seo" className="space-y-6">
                    {/* SEO AI Assistant */}
                    <div className="space-y-4 p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                      <h3 className="font-medium text-purple-700">AI SEO Assistant</h3>
                      <p className="text-sm text-gray-600">
                        AI will generate optimized SEO metadata based on your title and content
                      </p>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            const title = methods.getValues("title");
                            const content = methods.getValues("content");
                            const category = categories.find(c => c._id === methods.watch("categoryId"))?.name || "";

                            if (!title) {
                              toast.error("শিরোনাম প্রয়োজন", {
                                description: "SEO জেনারেটের জন্য শিরোনাম প্রয়োজন",
                              });
                              return;
                            }

                            try {
                              toast.loading("AI generating SEO metadata...");
                              const response = await axios.post("/api/ai/blog-helper", {
                                action: "generateSEO",
                                data: {
                                  title: title,
                                  content: content || title,
                                  category: category,
                                },
                              });

                              toast.dismiss();
                              if (response.data.success && response.data.result) {
                                const seoData = response.data.result;

                                // Set meta title and description
                                if (seoData.metaTitle) {
                                  methods.setValue("seo.metaTitle", seoData.metaTitle);
                                }
                                if (seoData.metaDescription) {
                                  methods.setValue("seo.metaDescription", seoData.metaDescription);
                                }

                                toast.success("SEO জেনারেট হয়েছে!", {
                                  description: "মেটা শিরোনাম এবং বিবরণ যুক্ত করা হয়েছে",
                                });
                              } else {
                                toast.error("SEO জেনারেট ব্যর্থ");
                              }
                            } catch (error) {
                              toast.dismiss();
                              console.error("SEO generation error:", error);
                              toast.error("SEO জেনারেট ব্যর্থ");
                            }
                          }}
                          className="border-purple-300 text-purple-700 hover:bg-purple-50"
                        >
                          Generate SEO Metadata
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            const title = methods.getValues("title");
                            const content = methods.getValues("content");

                            if (!title) {
                              toast.error("শিরোনাম প্রয়োজন", {
                                description: "Image alt text তৈরির জন্য শিরোনাম প্রয়োজন",
                              });
                              return;
                            }

                            try {
                              toast.loading("AI generating alt text...");
                              const response = await axios.post("/api/ai/blog-helper", {
                                action: "generateImageAlt",
                                data: {
                                  context: title + (content ? ` - ${content.substring(0, 100)}...` : ""),
                                },
                              });

                              toast.dismiss();
                              if (response.data.success && response.data.result) {
                                methods.setValue("coverImageAlt", response.data.result);
                                toast.success("Image Alt Text জেনারেট হয়েছে!");
                              } else {
                                toast.error("Alt Text জেনারেট ব্যর্থ");
                              }
                            } catch (error) {
                              toast.dismiss();
                              console.error("Alt text generation error:", error);
                              toast.error("Alt Text জেনারেট ব্যর্থ");
                            }
                          }}
                          className="border-purple-300 text-purple-700 hover:bg-purple-50"
                        >
                          Generate Image Alt Text
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-medium">SEO তথ্য</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">মেটা শিরোনাম</label>
                          <span className="text-xs text-gray-500">
                            {methods.watch("seo.metaTitle")?.length || 0}/60
                          </span>
                        </div>
                        <Input
                          placeholder="সার্চ ইঞ্জিনের জন্য শিরোনাম"
                          {...methods.register("seo.metaTitle")}
                        />
                        <p className="text-xs text-gray-500">
                          সর্বোচ্চ ৬০ অক্ষর - সার্চ রেজাল্টে এটি প্রদর্শিত হবে
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">মেটা বিবরণ</label>
                          <span className="text-xs text-gray-500">
                            {methods.watch("seo.metaDescription")?.length || 0}/155
                          </span>
                        </div>
                        <Textarea
                          placeholder="সার্চ ইঞ্জিনের জন্য সারাংশ (১৫৫ অক্ষরের মধ্যে)"
                          {...methods.register("seo.metaDescription")}
                        />
                        <p className="text-xs text-gray-500">
                          সর্বোচ্চ ১৫৫ অক্ষর - সার্চ রেজাল্টে এটি প্রদর্শিত হবে
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-medium">ব্লগ সেটিংস</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">স্ট্যাটাস</label>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            {...methods.register("status")}
                          >
                            <option value="draft">ড্রাফট</option>
                            <option value="published">প্রকাশিত</option>
                            <option value="scheduled">নির্ধারিত</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">প্রকাশনার তারিখ</label>
                          <Input
                            type="date"
                            {...methods.register("publishedAt")}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          {...methods.register("featured")}
                        />
                        <label htmlFor="featured" className="text-sm font-medium">
                          এটি ফিচার্ড ব্লগ হিসেবে চিহ্নিত করুন
                        </label>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Submit Buttons */}
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex gap-4">
                      {activeTab !== "basic-info" && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={goToPrevTab}
                        >
                          পেছনে যান
                        </Button>
                      )}
                      {activeTab !== "seo" ? (
                        <Button
                          type="button"
                          onClick={goToNextTab}
                          className="ml-auto"
                        >
                          পরবর্তী ধাপে যান
                        </Button>
                      ) : (
                        <div className="flex gap-2 ml-auto">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={() => methods.handleSubmit((data) => onSubmit(data, false))()}
                          >
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            ড্রাফট সংরক্ষণ করুন
                          </Button>
                          <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => methods.handleSubmit((data) => onSubmit(data, true))()}
                            className="bg-primary-600 hover:bg-primary-700"
                          >
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            ব্লগ প্রকাশ করুন
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </FormProvider>
    </div>
  );
}
