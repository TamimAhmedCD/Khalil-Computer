import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const blogsCol = await collection("blogs");

    // Get the current blog
    const currentBlog = await blogsCol.findOne({ _id: new ObjectId(id) });

    if (!currentBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Build query for related blogs
    const query = {
      _id: { $ne: new ObjectId(id) }, // Exclude current blog
      status: "published",
    };

    // Include blogs with same category OR matching tags
    const orConditions = [];
    if (currentBlog.categoryId) {
      orConditions.push({ categoryId: currentBlog.categoryId });
    }
    if (currentBlog.tagIds && currentBlog.tagIds.length > 0) {
      orConditions.push({ tagIds: { $in: currentBlog.tagIds } });
    }

    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    // Get related blogs (limit to 4)
    const relatedBlogs = await blogsCol
      .find(query)
      .limit(4)
      .toArray();

    return NextResponse.json({
      success: true,
      relatedBlogs,
    });
  } catch (error) {
    console.error("GET related blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch related blogs" },
      { status: 500 }
    );
  }
}
