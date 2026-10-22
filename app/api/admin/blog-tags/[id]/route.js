import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid tag ID" },
        { status: 400 }
      );
    }

    const tagsCol = await collection("blogTags");

    const tag = await tagsCol.findOne({ _id: new ObjectId(id) });

    if (!tag) {
      return NextResponse.json(
        { success: false, error: "Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      tag,
    });
  } catch (error) {
    console.error("GET tag error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tag" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid tag ID" },
        { status: 400 }
      );
    }

    const tagsCol = await collection("blogTags");
    const blogsCol = await collection("blogs");

    // Remove tag from all blogs that use it
    await blogsCol.updateMany(
      { tagIds: new ObjectId(id) },
      { $pull: { tagIds: new ObjectId(id) } }
    );

    // Delete from MongoDB
    const result = await tagsCol.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: "Tag deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Delete tag error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
