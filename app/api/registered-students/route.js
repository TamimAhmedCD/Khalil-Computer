import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ a: 1 });
}

export async function POST(request) {
  try {
    const studentData = await request.json();
    const studentsCollection = await collection("registered_students");

    // Determine course prefix
    let prefix = "STD"; // default
    const courseName = studentData.course?.trim();

    if (courseName === "গ্রাফিক্স ডিজাইন") {
      prefix = "GD";
    } else if (courseName === "ব্যাসিক কম্পিউটার") {
      prefix = "BC";
    } else if (courseName === "ওয়েব ডিজাইন এন্ড ডেভেলপমেন্ট") {
      prefix = "WDD";
    }

    // Count students already registered for this course
    const prefixCount = await studentsCollection.countDocuments({
      course: courseName, // match course also
      studentId: { $regex: `^${prefix}-` }, // match ID format
    });

    // Generate serial number
    const serialNumber = prefixCount + 1;
    const paddedSerial = serialNumber.toString().padStart(4, "0"); // 0001, 0002, etc.
    const studentId = `${prefix}-${paddedSerial}`;

    // Create the full student object
    const newStudent = {
      ...studentData,
      registrationDate: new Date(),
      studentId,
      status: "pending", // default status
    };

    // Insert into database
    const result = await studentsCollection.insertOne(newStudent);

    return NextResponse.json({
      message: "Student data saved",
      result,
    });
  } catch (error) {
    console.error("Insert error", error);
    return NextResponse.json(
      { error: "Failed to save Student data" },
      { status: 500 }
    );
  }
}
