import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data = {};
    let studentImageFile = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (key === "studentImage") {
          if (value instanceof File && value.size > 0 && value.name !== "undefined") {
            studentImageFile = value;
          } else if (typeof value === "string") {
            data[key] = value;
          }
        } else {
          data[key] = value;
        }
      }
    } else {
      data = await req.json();
      if (data.studentImage && typeof data.studentImage === "string" && data.studentImage.startsWith("data:image")) {
        // Convert base64 to File for backward compatibility
        const base64Data = data.studentImage.split(",")[1];
        const mimeMatch = data.studentImage.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        const buffer = Buffer.from(base64Data, "base64");
        const blob = new Blob([buffer], { type: mimeType });
        studentImageFile = new File([blob], "student-image.jpg", { type: mimeType });
      }
    }

    const { _id, studentImage, ...rest } = data;
    let imageUrl = typeof studentImage === "string" ? studentImage : "";

    // Upload to Cloudinary if new image file is provided
    if (studentImageFile) {
      imageUrl = await uploadToCloudinary(studentImageFile, "khalilcomputer/students");
    }

    const studentsCol = await collection("students");

    if (_id && ObjectId.isValid(_id)) {
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
        message: "Student updated successfully",
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
        message: "Student added successfully",
        studentId: result.insertedId,
        student: newStudent,
      });
    }
  } catch (err) {
    console.error("Student API Error:", err);
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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const course = searchParams.get("course") || "";
    const status = searchParams.get("status") || "";

    const studentsCol = await collection("students");

    // Build query based on filters
    const query = {};

    if (idNumber) {
      query.idNumber = idNumber.trim();
    }

    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { idNumber: { $regex: search, $options: "i" } },
        { studentMobile: { $regex: search, $options: "i" } },
      ];
    }

    if (course && course !== "all") {
      query.course = course;
    }

    if (status && status !== "all") {
      if (status === "paid") {
        query.outstandingAmount = { $eq: "0" };
      } else if (status === "unpaid") {
        query.outstandingAmount = { $ne: "0" };
      }
    }

    const skip = (page - 1) * limit;

    // Get total count
    const total = await studentsCol.countDocuments(query);

    // Get paginated results
    const students = await studentsCol
      .find(query)
      .sort({ createdAt: -1 }) // Show newest first
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("GET students error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}
