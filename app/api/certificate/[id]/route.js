import { NextResponse } from "next/server";
import { collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

import puppeteer from "puppeteer";
import QRCode from "qrcode";

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

    // 2. Get student from DB
    const db = await collection("students");

    const student = await db.findOne({
      _id: new ObjectId(id),
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // 3. Generate certificate ID (fallback)
    const certificateId = student.certificateId || `CERT-${student._id}`;

    // 4. QR CODE GENERATION
    const qrCode = await QRCode.toDataURL(
      `https://yourdomain.com/verify/${certificateId}`,
    );

    // 5. HTML TEMPLATE (Certificate Design)
    const html = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            font-family: Arial;
          }

          .page {
            width: 1000px;
            height: 700px;
            position: relative;
          }

          .bg {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .name {
            position: absolute;
            top: 320px;
            width: 100%;
            text-align: center;
            font-size: 42px;
            font-weight: bold;
          }

          .course {
            position: absolute;
            top: 400px;
            width: 100%;
            text-align: center;
            font-size: 22px;
          }

          .id {
            position: absolute;
            top: 460px;
            width: 100%;
            text-align: center;
            font-size: 16px;
          }

          .qr {
            position: absolute;
            bottom: 50px;
            right: 50px;
            width: 120px;
            height: 120px;
          }
        </style>
      </head>

      <body>
        <div class="page">

          <!-- BACKGROUND PDF (convert to image if needed) -->
          <img class="bg" src="https://yourdomain.com/certificate-bg.png" />

          <!-- NAME -->
          <div class="name">${student.studentName}</div>

          <!-- COURSE -->
          <div class="course">${student.course}</div>

          <!-- CERTIFICATE ID -->
          <div class="id">${certificateId}</div>

          <!-- QR CODE -->
          <img class="qr" src="${qrCode}" />

        </div>
      </body>
    </html>
    `;

    // 6. PUPPETEER PDF GENERATION
    const browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // 7. RETURN PDF
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${student.studentName}-certificate.pdf`,
      },
    });
  } catch (error) {
    console.log("CERT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 },
    );
  }
}
