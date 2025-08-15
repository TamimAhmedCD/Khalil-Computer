import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary"; // your helper

export async function POST(req) {
  try {
    const body = await req.json();
    const { _id, studentImage, ...rest } = body;

    let imageUrl = studentImage;

    // Upload new image only if studentImage is a File or Base64
    if (studentImage && studentImage.startsWith("data:image")) {
      imageUrl = await uploadToCloudinary(studentImage);
    }

    const studentsCol = await collection("students");
    let result;

    if (_id) {
      // EDIT student
      const updateData = {
        ...rest,
        studentImage: imageUrl,
        updatedAt: new Date(),
      };
      result = await studentsCol.updateOne(
        { _id: new Object(_id) },
        { $set: updateData }
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
      result = await studentsCol.insertOne(newStudent);
      return NextResponse.json({
        success: true,
        message: "Student added",
        studentId: result.insertedId,
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const courses = await (await collection("courses")).find().toArray();
    return NextResponse.json(courses);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
