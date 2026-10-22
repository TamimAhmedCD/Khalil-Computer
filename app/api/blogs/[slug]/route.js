import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  try {
    const { slug } = params;

    const blogsCol = await collection("blogs");

    // Increment view count
    const result = await blogsCol.updateOne(
      { slug, status: "published" },
      { $inc: { viewCount: 1 } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Blog not found or not published" },
        { status: 404 }
      );
    }

    // Get the updated blog
    const blog = await blogsCol.findOne({ slug, status: "published" });

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Increment view count error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const { slug } = params;

    const blogsCol = await collection("blogs");

    const blog = await blogsCol.findOne({ slug, status: "published" });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found or not published" },
        { status: 404 }
      );
    }

    // Increment view count (non-blocking)
    blogsCol.updateOne(
      { slug, status: "published" },
      { $inc: { viewCount: 1 } }
    ).catch(() => {});

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("GET blog error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
