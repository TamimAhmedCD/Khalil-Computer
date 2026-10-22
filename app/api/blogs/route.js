import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const blogsCol = await collection("blogs");

    // Build query for published blogs
    const query = { status: "published" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      const categoriesCol = await collection("blogCategories");
      const cat = await categoriesCol.findOne({ slug: category });
      if (cat) {
        query.categoryId = cat._id;
      }
    }

    if (tag && tag !== "all") {
      const tagsCol = await collection("blogTags");
      const t = await tagsCol.findOne({ slug: tag });
      if (t) {
        query.tagIds = t._id;
      }
    }

    const skip = (page - 1) * limit;

    // Get total count
    const total = await blogsCol.countDocuments(query);

    // Get paginated results
    const blogs = await blogsCol
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get categories for filtering
    const categoriesCol = await collection("blogCategories");
    const categories = await categoriesCol.find({ status: "active" }).toArray();

    // Get tags
    const tagsCol = await collection("blogTags");
    const tags = await tagsCol.find({}).toArray();

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      categories,
      tags,
    });
  } catch (error) {
    console.error("GET public blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
