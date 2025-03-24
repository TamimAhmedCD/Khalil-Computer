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