"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, FileText, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BLOG_TYPES = [
  { value: "tutorial", label: "টিউটোরিয়াল (Step-by-Step)", description: "How-to guides for computer skills" },
  { value: "educational", label: "শিক্ষামূলক", description: "Educational content about technology" },
  { value: "news", label: "নিউজ/আপডেট", description: "Latest tech news and updates" },
  { value: "tips", label: "টিপস অ্যান্ড ট্রিকস", description: "Practical tips and tricks" },
  { value: "review", label: "রিভিউ", description: "Product or software reviews" },
  { value: "explainer", label: "বিস্তারিত ব্যাখ্যা", description: "In-depth explanations" },
  { value: "list", label: "লিস্ট আর্টিকেল", description: "Top 10 lists, best of lists" },
  { value: "case-study", label: "কেস স্টাডি", description: "Real-world examples and success stories" },
];

const TONE_OPTIONS = [
  { value: "professional", label: "প্রফেশনাল (Professional)" },
  { value: "friendly", label: "বন্ধুত্বপূর্ণ (Friendly)" },
  { value: "authoritative", label: "আস্থাশীল (Authoritative)" },
  { value: "enthusiastic", label: "উদ্যমী (Enthusiastic)" },
  { value: "conversational", label: "আলাপচারিতামূলক (Conversational)" },
];

export default function FullBlogGenerator({ formMethods, categories, tags }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    keywords: "",
    blogType: "tutorial",
    tone: "friendly",
    length: "medium",
    includeExamples: true,
    includeBangla: true,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateFullBlog = async () => {
    if (!formData.topic) {
      toast.error("টপিক প্রয়োজন", { description: "ব্লগের বিষয় লিখুন" });
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post("/api/ai/blog-helper", {
        action: "generateFullBlog",
        data: {
          ...formData,
          category: categories.find(c => c._id === formMethods.getValues("categoryId"))?.name || "",
          tags: formMethods.getValues("tags") || [],
        },
      });

      if (response.data.success && response.data.result) {
        const blog = response.data.result;

        // Auto-fill all form fields
        formMethods.setValue("title", blog.title);
        formMethods.setValue("slug", blog.slug);
        formMethods.setValue("excerpt", blog.excerpt);
        formMethods.setValue("content", blog.content);
        formMethods.setValue("coverImageAlt", blog.coverImageAlt || "");
        formMethods.setValue("seo.metaTitle", blog.seo.metaTitle);
        formMethods.setValue("seo.metaDescription", blog.seo.metaDescription);

        if (blog.keywords) {
          formMethods.setValue("seo.keywords", blog.keywords);
        }
        if (blog.suggestedTags && blog.suggestedTags.length > 0) {
          toast.info("ট্যাগ সাজেশন", {
            description: `সাজেস্টেড ট্যাগ: ${blog.suggestedTags.join(", ")}`,
          });
        }

        setGenerated(true);
        toast.success("ব্লগ জেনারেট সফল", {
          description: "সম্পূর্ণ ব্লগ তৈরি এবং ফর্মে যুক্ত করা হয়েছে",
        });

        // Reset after 3 seconds
        setTimeout(() => setGenerated(false), 3000);
      }
    } catch (error) {
      console.error("Blog generation error:", error);
      toast.error("ব্লগ জেনারেট ব্যর্থ", {
        description: error.response?.data?.error || "আবার চেষ্টা করুন",
      });
    } finally {
      setGenerating(false);
    }
  };

  const generateTitleOnly = async () => {
    if (!formData.topic) {
      toast.error("টপিক প্রয়োজন");
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post("/api/ai/blog-helper", {
        action: "generateTitles",
        data: {
          topic: formData.topic,
          blogType: formData.blogType,
        },
      });

      if (response.data.success && response.data.result) {
        const titles = response.data.result;
        toast.success("টাইটেল জেনারেট করা হয়েছে", {
          description: "নিচের টাইটেলগুলির যেকোনো একটি নির্বাচন করুন",
          action: {
            label: "দেখুন",
            onClick: () => {
              const selectedTitle = prompt(
                "নিচের টাইটেলগুলির যেকোনো একটি নির্বাচন করুন:\n\n" +
                titles.map((t, i) => `${i + 1}. ${t}`).join("\n") +
                "\n\nটাইটেল নম্বর লিখুন:"
              );

              if (selectedTitle && !isNaN(selectedTitle)) {
                const index = parseInt(selectedTitle) - 1;
                if (index >= 0 && index < titles.length) {
                  formMethods.setValue("title", titles[index]);
                }
              }
            },
          },
        });
      }
    } catch (error) {
      console.error("Title generation error:", error);
      toast.error("টাইটেল জেনারেট ব্যর্থ");
    } finally {
      setGenerating(false);
    }
  };

  const generateOutlineOnly = async () => {
    if (!formData.topic) {
      toast.error("টপিক প্রয়োজন");
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post("/api/ai/blog-helper", {
        action: "generateOutline",
        data: {
          topic: formData.topic,
          blogType: formData.blogType,
          tone: formData.tone,
        },
      });

      if (response.data.success && response.data.result) {
        const outline = response.data.result;
        const contentWithOutline = `
          <h2>ব্লগ আউটলাইন</h2>
          <ul>
            ${outline.map(item => `<li>${item}</li>`).join("")}
          </ul>
          <hr>
          <p>বিস্তারিত কন্টেন্ট এখানে যুক্ত করুন...</p>
        `;

        formMethods.setValue("content", contentWithOutline);
        toast.success("আউটলাইন জেনারেট করা হয়েছে", {
          description: "কন্টেন্ট আউটলাইন তৈরি হয়েছে",
        });
      }
    } catch (error) {
      console.error("Outline generation error:", error);
      toast.error("আউটলাইন জেনারেট ব্যর্থ");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Wand2 className="w-6 h-6" />
          সম্পূর্ণ ব্লগ জেনারেটর
        </CardTitle>
        <CardDescription className="text-purple-600">
          AI দিয়ে সম্পূর্ণ ব্লগ তৈরি করুন (টাইটেল থেকে শেষ পর্যন্ত)
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">
            ব্লগের বিষয়/টপিক *
          </label>
          <Input
            placeholder="উদাহরণ: কম্পিউটার প্রোগ্রামিং শেখার সহজ উপায়"
            value={formData.topic}
            onChange={(e) => handleInputChange("topic", e.target.value)}
            disabled={generating}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-700">
            কীওয়ার্ড (কমা দিয়ে আলাদা করুন)
          </label>
          <Input
            placeholder="উদাহরণ: কম্পিউটার, প্রোগ্রামিং, HTML, CSS, JavaScript"
            value={formData.keywords}
            onChange={(e) => handleInputChange("keywords", e.target.value)}
            disabled={generating}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-700">
              ব্লগ টাইপ
            </label>
            <Select
              value={formData.blogType}
              onValueChange={(value) => handleInputChange("blogType", value)}
              disabled={generating}
            >
              <SelectTrigger>
                <SelectValue placeholder="টাইপ নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {BLOG_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col">
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-700">
              টোন
            </label>
            <Select
              value={formData.tone}
              onValueChange={(value) => handleInputChange("tone", value)}
              disabled={generating}
            >
              <SelectTrigger>
                <SelectValue placeholder="টোন নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {TONE_OPTIONS.map((tone) => (
                  <SelectItem key={tone.value} value={tone.value}>
                    {tone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="outline" className="text-purple-600 border-purple-300">
            {BLOG_TYPES.find(t => t.value === formData.blogType)?.label}
          </Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-300">
            {TONE_OPTIONS.find(t => t.value === formData.tone)?.label}
          </Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-300">
            বাংলা: {formData.includeBangla ? "হ্যাঁ" : "না"}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateTitleOnly}
            disabled={generating || !formData.topic}
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            {generating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            শুধু টাইটেল জেনারেট করুন
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateOutlineOnly}
            disabled={generating || !formData.topic}
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            {generating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            আউটলাইন জেনারেট করুন
          </Button>

          <Button
            type="button"
            onClick={generateFullBlog}
            disabled={generating || !formData.topic}
            className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {generated ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : generating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {generated ? "জেনারেট হয়েছে!" : "সম্পূর্ণ ব্লগ জেনারেট করুন"}
          </Button>
        </div>

        {generated && (
          <div className="p-3 border border-green-300 bg-green-50 rounded-lg mt-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">ব্লগ সফলভাবে তৈরি হয়েছে!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              সম্পূর্ণ ব্লগ ফর্মে যুক্ত করা হয়েছে। এখন SEO ট্যাবে গিয়ে AI দিয়ে SEO অপটিমাইজ করুন।
            </p>
          </div>
        )}

        <p className="text-xs text-purple-600 pt-2 border-t border-purple-100">
          <Sparkles className="w-3 h-3 inline mr-1" />
          AI দিয়ে সম্পূর্ণ ব্লগ তৈরি করবে: টাইটেল, কন্টেন্ট, এক্সসার্প্ট, SEO তথ্য, ইমেজ alt text
        </p>
      </CardContent>
    </Card>
  );
}
