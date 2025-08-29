import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const updatedNotice = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Invalid notice ID" }, { status: 400 });
    }
    const result = await (
      await collection("notices")
    ).updateOne({ _id: new ObjectId(id) }, { $set: updatedNotice });
    if (result.matchCount === 0) {
      return NextResponse.json({ error: "Notice not found" }, { status: 400 });
    }
    return NextResponse.json({
      message: "Notice updated successfully",
      result,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update notice" },
      { status: 500 }
    );
  }
}
