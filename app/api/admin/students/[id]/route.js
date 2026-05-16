import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    const id = context.params.id;

    console.log("Received ID:", id);

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = await collection("students");

    const student = await db.findOne({
      _id: new ObjectId(id),
    });

    console.log("Student found:", student);

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.log("ERROR:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
