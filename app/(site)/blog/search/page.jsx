"use client";

import { Suspense } from "react";
import BlogSearchContent from "./BlogSearchContent";
import { Loader2 } from "lucide-react";

export default function BlogSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="m-6 md:m-8 min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">লোড হচ্ছে...</p>
          </div>
        </div>
      }
    >
      <BlogSearchContent />
    </Suspense>
  );
}
