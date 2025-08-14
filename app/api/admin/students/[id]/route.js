import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid Student ID" }, { status: 400 });
  }

  try {
    const db = await collection("students");
    const student = await db.findOne({ _id: new ObjectId(id) });

    if (!student) {
      return NextResponse.json(
        { error: "Student ID not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}
