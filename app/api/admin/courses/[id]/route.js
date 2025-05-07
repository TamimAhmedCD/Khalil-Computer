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
