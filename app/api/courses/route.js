import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// 📌 GET: Fetch all courses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("khalil_computer");
    const courses = await db.collection("courses").find({}).toArray();

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// 📌 POST: Add courses
export async function POST(req) {
  try {
    const course = await req.json();
    const client = await clientPromise;
    const db = client.db("khalil_computer");

    const result = await db.collection("courses").insertOne(course);
    return NextResponse.json({
      message: "Course created successfully",
      course: { ...course, _id: result.insertedId },
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to create course",
      status: 500,
    });
  }
}
