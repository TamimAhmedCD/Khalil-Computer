import { NextResponse } from "next/server";
import {
  generateSEOMetadata,
  generateExcerpt,
  getContentSuggestions,
  generateImageAlt,
  suggestRelatedTopics,
  generateFullBlog,
  generateTitles,
  generateTitleFromPrompt,
  generateSeoSlug,
  generateOutline,
} from "@/lib/aiHelper";

export async function POST(req) {
  try {
    const { action, data } = await req.json();

    let result;

    switch (action) {
      case "generateSEO":
        result = await generateSEOMetadata(
          data.title,
          data.content,
          data.category
        );
        break;

      case "generateExcerpt":
        result = await generateExcerpt(data.content, data.maxLength);
        break;

      case "getContentSuggestions":
        result = await getContentSuggestions(data.content, data.tone);
        break;

      case "generateImageAlt":
        result = await generateImageAlt(data.context);
        break;

      case "suggestRelatedTopics":
        result = await suggestRelatedTopics(
          data.title,
          data.category,
          data.tags
        );
        break;

      case "generateFullBlog":
        result = await generateFullBlog(
          data.topic,
          data.keywords,
          data.blogType,
          data.tone,
          data.category
        );
        break;

      case "generateTitles":
        result = await generateTitles(data.topic, data.blogType);
        break;

      case "generateTitleFromPrompt":
        result = await generateTitleFromPrompt(data.prompt, data.blogType);
        break;

      case "generateSeoSlug":
        result = await generateSeoSlug(data.title);
        break;

      case "generateOutline":
        result = await generateOutline(data.topic, data.blogType, data.tone);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    if (!result) {
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: error.message || "AI request failed" },
      { status: 500 }
    );
  }
}
