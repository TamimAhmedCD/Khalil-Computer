import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// 📌 GET: Fetch all courses
export async function GET() {
  try {
    const courses = await (await collection("courses")).find({}).toArray();
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// 📌 POST: Add a new course
export async function POST(req) {
  try {
    const course = await req.json();
    const result = await (await collection("courses")).insertOne(course);

    return NextResponse.json({
      message: "Course created successfully",
      result,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
