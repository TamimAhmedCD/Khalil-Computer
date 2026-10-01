import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { deleteFromCloudinary } from "@/lib/cloudinaryHelper";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = await collection("students");
    const student = await db.findOne({
      _id: new ObjectId(id),
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("ERROR in GET student by ID:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid student ID" },
        { status: 400 }
      );
    }

    const studentsCol = await collection("students");

    // Get student to check for image URL
    const student = await studentsCol.findOne({ _id: new ObjectId(id) });

    // Delete student from MongoDB
    const result = await studentsCol.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary if exists
    if (student?.studentImage && student.studentImage.includes("cloudinary")) {
      try {
        console.log("Attempting to delete image from Cloudinary:", student.studentImage);
        const deleteResult = await deleteFromCloudinary(student.studentImage);
        console.log("Cloudinary deletion result:", deleteResult);
      } catch (deleteError) {
        console.warn("Failed to delete image from Cloudinary:", deleteError.message);
        // Continue even if deletion fails
      }
    } else {
      console.log("Not deleting image. Student image:", student?.studentImage || "No image");
    }

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("ERROR in DELETE student:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
