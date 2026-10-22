import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
import { generateUniqueSlug } from "@/lib/serverSlugify";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
    } else {
      data = await req.json();
    }

    const { _id, name, ...rest } = data;

    // Generate slug from name if not provided
    if (!rest.slug && name) {
      const slug = slugify(name);
      const uniqueSlug = await generateUniqueSlug(slug, () => collection("blogTags"), _id);
      rest.slug = uniqueSlug;
    }

    const tagsCol = await collection("blogTags");

    if (_id && ObjectId.isValid(_id)) {
      // UPDATE tag
      const result = await tagsCol.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...rest, updatedAt: new Date() } }
      );

      return NextResponse.json({
        success: true,
        message: "Tag updated successfully",
        result,
      });
    } else {
      // CREATE tag
      const newTag = {
        name,
        ...rest,
        createdAt: new Date(),
      };

      const result = await tagsCol.insertOne(newTag);

      return NextResponse.json({
        success: true,
        message: "Tag created successfully",
        tagId: result.insertedId,
      });
    }
  } catch (err) {
    console.error("Blog Tag API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    console.log("Tags API: GET request received");
    const tagsCol = await collection("blogTags");

    const tags = await tagsCol
      .find({})
      .sort({ name: 1 })
      .toArray();

    console.log(`Found ${tags.length} tags`);

    return NextResponse.json({
      success: true,
      tags,
    });
  } catch (error) {
    console.error("GET blog tags error:", error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to fetch tags: ${error.message}` },
      { status: 500 }
    );
  }
}
