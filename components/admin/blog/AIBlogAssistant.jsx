"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, FileText, Tag, Image as ImageIcon, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function AIBlogAssistant({ formMethods, categoryName, tags }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  const callAI = async (action, data) => {
    setIsGenerating(true);
    try {
      const response = await axios.post("/api/ai/blog-helper", {
        action,
        data,
      });
      return response.data.result;
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("AI সহায়তা ব্যর্থ", {
        description: error.response?.data?.error || "আবার চেষ্টা করুন",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSEO = async () => {
    const title = formMethods.getValues("title");
    const content = formMethods.getValues("content");

    if (!title || !content) {
      toast.error("শিরোনাম এবং কন্টেন্ট প্রয়োজন");
      return;
    }

    const result = await callAI("generateSEO", {
      title,
      content,
      category: categoryName || "General",
    });

    if (result) {
      formMethods.setValue("seo.metaTitle", result.metaTitle);
      formMethods.setValue("seo.metaDescription", result.metaDescription);
      toast.success("SEO মেটাডেটা জেনারেট হয়েছে!", {
        description: "Meta title এবং description আপডেট করা হয়েছে",
      });
    }
  };

  const handleGenerateExcerpt = async () => {
    const content = formMethods.getValues("content");

    if (!content) {
      toast.error("কন্টেন্ট প্রয়োজন");
      return;
    }

    const result = await callAI("generateExcerpt", {
      content,
      maxLength: 150,
    });

    if (result) {
      formMethods.setValue("excerpt", result);
      toast.success("সারাংশ জেনারেট হয়েছে!");
    }
  };

  const handleGenerateImageAlt = async () => {
    const title = formMethods.getValues("title");
    const excerpt = formMethods.getValues("excerpt");

    if (!title) {
      toast.error("শিরোনাম প্রয়োজন");
      return;
    }

    const result = await callAI("generateImageAlt", {
      context: `Blog Title: ${title}\nExcerpt: ${excerpt || ""}`,
    });

    if (result) {
      formMethods.setValue("coverImageAlt", result);
      toast.success("Image Alt Text জেনারেট হয়েছে!");
    }
  };

  const handleGetContentSuggestions = async () => {
    const content = formMethods.getValues("content");

    if (!content) {
      toast.error("কন্টেন্ট প্রয়োজন");
      return;
    }

    const result = await callAI("getContentSuggestions", {
      content,
      tone: "professional",
    });

    if (result) {
      setSuggestions(result);
      toast.success("কন্টেন্ট বিশ্লেষণ সম্পন্ন!");
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          AI সহায়তা
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateSEO}
            disabled={isGenerating}
            className="justify-start"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            SEO জেনারেট করুন
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateExcerpt}
            disabled={isGenerating}
            className="justify-start"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            সারাংশ জেনারেট করুন
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateImageAlt}
            disabled={isGenerating}
            className="justify-start"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ImageIcon className="w-4 h-4 mr-2" />
            )}
            Alt Text জেনারেট করুন
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGetContentSuggestions}
            disabled={isGenerating}
            className="justify-start"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Lightbulb className="w-4 h-4 mr-2" />
            )}
            কন্টেন্ট বিশ্লেষণ করুন
          </Button>
        </div>

        {suggestions && (
          <div className="mt-4 p-4 border rounded-lg bg-background space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Readability: {suggestions.readabilityScore}/10
              </Badge>
              <Badge variant="outline">{suggestions.keywordDensity}</Badge>
              <Badge variant="outline">{suggestions.headingStructure}</Badge>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">উন্নতির পরামর্শ:</h4>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                {suggestions.suggestions?.map((suggestion, idx) => (
                  <li key={idx}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3 inline mr-1" />
          AI দিয়ে SEO অপটিমাইজড ব্লগ তৈরি করুন
        </p>
      </CardContent>
    </Card>
  );
}
