import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await (await collection("courses")).find().toArray();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
