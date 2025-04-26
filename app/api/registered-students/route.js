import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ a: 1 });
}

export async function POST(request) {
  try {
    const studentData = await request.json();
    const result = await (
      await collection("registered_students")
    ).insertOne(studentData);
    return NextResponse.json({
      message: "Student data saved",
      result,
    });
  } catch (error) {
    console.log("insert error", error);
    return NextResponse.json({
      error: "Failed to save Student data",
      status: 500,
    });
  }
}
