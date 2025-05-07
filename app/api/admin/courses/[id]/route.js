import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const result = await (
      await collection("courses")
    ).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "course not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Course Deleted Successfully" });
  } catch (error) {
    console.log("error deleting course", error);
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
