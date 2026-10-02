import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data = {};
    let courseImageFile = null;
    let oldImageUrl = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (key === "courseThumbnail") {
          if (value instanceof File && value.size > 0 && value.name !== "undefined") {
            courseImageFile = value;
          } else if (typeof value === "string") {
            data[key] = value;
          }
        } else if (key === "oldImageUrl") {
          oldImageUrl = value;
        } else {
          // Parse JSON strings (like tags array)
          if (key === "tags" && typeof value === "string") {
            try {
              data[key] = JSON.parse(value);
            } catch {
              data[key] = value;
            }
          }
          // Convert string numbers to numbers
          else if (["price", "totalClasses", "discount"].includes(key)) {
            data[key] = value === "" ? 0 : Number(value);
          }
          // Convert string booleans to booleans
          else if (["isPaid", "published"].includes(key)) {
            data[key] = value === "true" || value === true;
          }
          // Keep as is
          else {
            data[key] = value;
          }
        }
      }
    } else {
      data = await req.json();
      // Handle base64 images for backward compatibility
      if (data.courseThumbnail && typeof data.courseThumbnail === "string" && data.courseThumbnail.startsWith("data:image")) {
        const base64Data = data.courseThumbnail.split(",")[1];
        const mimeMatch = data.courseThumbnail.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        const buffer = Buffer.from(base64Data, "base64");
        const blob = new Blob([buffer], { type: mimeType });
        courseImageFile = new File([blob], "course-image.jpg", { type: mimeType });
      }
      oldImageUrl = data.oldImageUrl;
    }

    const { _id, courseThumbnail, ...rest } = data;
    let imageUrl = typeof courseThumbnail === "string" ? courseThumbnail : "";

    // Delete old image from Cloudinary if new image is provided
    if (courseImageFile && oldImageUrl && oldImageUrl.includes("cloudinary")) {
      const { deleteFromCloudinary } = await import("@/lib/cloudinaryHelper");
      try {
        await deleteFromCloudinary(oldImageUrl);
        console.log("Deleted old course image from Cloudinary:", oldImageUrl);
      } catch (deleteError) {
        console.warn("Failed to delete old image:", deleteError.message);
      }
    }

    // Upload to Cloudinary if new image provided
    if (courseImageFile) {
      const uploadResult = await uploadToCloudinary(courseImageFile, "khalilcomputer/courses");
      imageUrl = uploadResult.secure_url;
    }

    const coursesCol = await collection("courses");

    if (_id && ObjectId.isValid(_id)) {
      // UPDATE course
      const updateData = {
        ...rest,
        courseThumbnail: imageUrl,
        updatedAt: new Date(),
      };
      const result = await coursesCol.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
      return NextResponse.json({
        success: true,
        message: "Course updated successfully",
        result,
      });
    } else {
      // CREATE new course
      const newCourse = {
        ...rest,
        courseThumbnail: imageUrl,
        createdAt: new Date(),
      };
      const result = await coursesCol.insertOne(newCourse);
      return NextResponse.json({
        success: true,
        message: "Course added successfully",
        courseId: result.insertedId,
      });
    }
  } catch (err) {
    console.error("Course API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const published = searchParams.get("published");

    const coursesCol = await collection("courses");

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (published !== null && published !== undefined) {
      query.published = published === "true";
    }

    const skip = (page - 1) * limit;

    // Get total count
    const total = await coursesCol.countDocuments(query);

    // Get paginated results
    const courses = await coursesCol
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      courses,
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
    console.error("GET courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
