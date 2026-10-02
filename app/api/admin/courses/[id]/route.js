import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { deleteFromCloudinary } from "@/lib/cloudinaryHelper";

export async function DELETE(request, { params }) {
  try {
    const id = params.id;

    // Get course to check for image URL
    const db = await collection("courses");
    const course = await db.findOne({ _id: new ObjectId(id) });

    // Delete course from MongoDB
    const result = await db.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if exists
    if (course?.courseThumbnail && course.courseThumbnail.includes("cloudinary")) {
      try {
        await deleteFromCloudinary(course.courseThumbnail);
        console.log("Deleted course image from Cloudinary:", course.courseThumbnail);
      } catch (deleteError) {
        console.warn("Failed to delete course image from Cloudinary:", deleteError.message);
      }
    }

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = await params;

  // Check if ID is valid
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  try {
    const db = await collection("courses");
    const course = await db.findOne({ _id: new ObjectId(id) });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("GET course error:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  try {
    const payload = await req.json();
    const db = await collection("courses");

    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...payload } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Course not updated" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("PUT course error:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
