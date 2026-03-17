import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

export async function POST(req) {
  try {
    const body = await req.json();
    const { _id, studentImage, ...rest } = body;

    let imageUrl = studentImage;

    // Upload only if a new File object exists
    if (studentImage && studentImage instanceof File) {
      imageUrl = await uploadToCloudinary(studentImage);
    }

    const studentsCol = await collection("students");

    if (_id) {
      // EDIT student
      const updateData = {
        ...rest,
        studentImage: imageUrl,
        updatedAt: new Date(),
      };
      const result = await studentsCol.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData },
      );
      return NextResponse.json({
        success: true,
        message: "Student updated",
        result,
      });
    } else {
      // ADD new student
      const newStudent = {
        ...rest,
        studentImage: imageUrl,
        createdAt: new Date(),
      };
      const result = await studentsCol.insertOne(newStudent);
      return NextResponse.json({
        success: true,
        message: "Student added",
        studentId: result.insertedId,
        student: newStudent,
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const idNumber = searchParams.get("idNumber");

    const students = await (
      await collection("students")
    )
      .find(
        idNumber ? { idNumber: idNumber.trim() } : {},
        idNumber
          ? {
              projection: {
                studentName: 1,
                batchNumber: 1,
                idNumber: 1,
                course: 1,
                certificate_issued: 1,
                _id: 0,
              },
            }
          : {},
      )
      .toArray();

    return NextResponse.json(students);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}
