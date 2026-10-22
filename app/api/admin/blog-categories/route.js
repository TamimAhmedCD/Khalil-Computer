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
        if (key === "status") {
          data[key] = value === "true" || value === true ? "active" : "inactive";
        } else {
          data[key] = value;
        }
      }
    } else {
      data = await req.json();
      if (!data.status) {
        data.status = "active";
      }
    }

    const { _id, name, ...rest } = data;

    // Generate slug from name if not provided
    if (!rest.slug && name) {
      const slug = slugify(name);
      const uniqueSlug = await generateUniqueSlug(slug, () => collection("blogCategories"), _id);
      rest.slug = uniqueSlug;
    }

    const categoriesCol = await collection("blogCategories");

    if (_id && ObjectId.isValid(_id)) {
      // UPDATE category
      const result = await categoriesCol.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...rest, updatedAt: new Date() } }
      );

      return NextResponse.json({
        success: true,
        message: "Category updated successfully",
        result,
      });
    } else {
      // CREATE category
      const newCategory = {
        name,
        ...rest,
        createdAt: new Date(),
      };

      const result = await categoriesCol.insertOne(newCategory);

      return NextResponse.json({
        success: true,
        message: "Category created successfully",
        categoryId: result.insertedId,
      });
    }
  } catch (err) {
    console.error("Blog Category API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    console.log("Categories API: GET request received");
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    console.log("Status filter:", status);

    const categoriesCol = await collection("blogCategories");

    const query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    console.log("Query:", query);

    const categories = await categoriesCol
      .find(query)
      .sort({ name: 1 })
      .toArray();

    console.log(`Found ${categories.length} categories`);

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("GET blog categories error:", error.message, error.stack);
    return NextResponse.json(
      { error: `Failed to fetch categories: ${error.message}` },
      { status: 500 }
    );
  }
}
