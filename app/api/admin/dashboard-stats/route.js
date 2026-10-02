import { clientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("khalil_computer");

    // Fetch counts concurrently for faster response
    const [
      totalStudents,
      paidStudents,
      unpaidStudents,
      totalCourses,
      totalNotices
    ] = await Promise.all([
      db.collection("students").countDocuments(),
      db.collection("students").countDocuments({ outstandingAmount: { $in: [0, "0", null, ""] } }),
      db.collection("students").countDocuments({ outstandingAmount: { $nin: [0, "0", null, ""] } }),
      db.collection("courses").countDocuments(),
      db.collection("notices").countDocuments()
    ]);

    // Fetch recent students
    const recentStudents = await db.collection("students")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({
        studentName: 1,
        course: 1,
        studentImage: 1,
        createdAt: 1,
        outstandingAmount: 1
      })
      .toArray();

    // Fetch financial data (approximate)
    const aggregatedRevenue = await db.collection("students").aggregate([
      {
        $group: {
          _id: null,
          totalExpected: { $sum: { $toDouble: { $ifNull: ["$courseFee", 0] } } },
          totalCollected: { $sum: { $toDouble: { $ifNull: ["$amountPaid", 0] } } },
          totalDue: { $sum: { $toDouble: { $ifNull: ["$outstandingAmount", 0] } } }
        }
      }
    ]).toArray();

    const revenue = aggregatedRevenue.length > 0 ? aggregatedRevenue[0] : { totalExpected: 0, totalCollected: 0, totalDue: 0 };

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalStudents,
          paidStudents,
          unpaidStudents,
          totalCourses,
          totalNotices,
        },
        financial: revenue,
        recentStudents
      }
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
