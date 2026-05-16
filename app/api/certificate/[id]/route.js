import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // 1. Validate ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 },
      );
    }

    // 2. Get student from MongoDB
    const db = await collection("students");

    const student = await db.findOne({
      _id: new ObjectId(id),
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // 3. Load DOCX template (IMPORTANT PATH FIX)
    const templatePath = path.join(
      process.cwd(),
      "templates",
      "certificate.docx",
    );

    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: "Template file not found" },
        { status: 500 },
      );
    }

    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);

    // 4. Safe Docxtemplater init (NO CRASH VERSION)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 5. Render template variables
    doc.render({
      student_id: student.idNumber,
      student_name: student.studentName || "",
      course_name: student.course || "",
      course_duration: student.duration || "",
      issue_date: student.certificate_issued || new Date().toLocaleDateString(),
    });

    // 6. Generate DOCX buffer
    const buffer = doc.getZip().generate({
      type: "nodebuffer",
    });

    // 7. Return file download
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=${student.studentName}-certificate.docx`,
      },
    });
  } catch (error) {
    console.log("CERTIFICATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 },
    );
  }
}
