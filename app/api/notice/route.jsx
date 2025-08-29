import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const notice = await (await collection("notices")).find().toArray();
        return NextResponse.json(notice);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch notices" },
            { status: 500 }
        );
    }
}