import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const categoriesCol = await collection("blogCategories");

    const category = await categoriesCol.findOne({ _id: new ObjectId(id) });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("GET category error:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const categoriesCol = await collection("blogCategories");
    const blogsCol = await collection("blogs");

    // Check if any blogs use this category
    const blogCount = await blogsCol.countDocuments({ categoryId: new ObjectId(id) });

    if (blogCount > 0) {
      return NextResponse.json({
        success: false,
        error: `Cannot delete category. ${blogCount} blog(s) are using this category.`,
        blogCount,
      }, { status: 409 });
    }

    // Delete from MongoDB
    const result = await categoriesCol.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
