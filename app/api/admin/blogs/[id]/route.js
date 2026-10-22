import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { deleteFromCloudinary } from "@/lib/cloudinaryHelper";
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

    const blog = await blogsCol.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

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

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const blogsCol = await collection("blogs");

    // Get blog to check for image URL
    const blog = await blogsCol.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete Cloudinary image if exists
    if (blog.coverImage && blog.coverImage.includes("cloudinary")) {
      try {
        await deleteFromCloudinary(blog.coverImage);
        console.log("Deleted blog cover image from Cloudinary:", blog.coverImage);
      } catch (deleteError) {
        console.warn("Failed to delete image:", deleteError.message);
      }
    }

    // Delete from MongoDB
    const result = await blogsCol.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
