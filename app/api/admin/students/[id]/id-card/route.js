import { NextResponse } from 'next/server';
import { collection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { generateStudentQRCode } from '@/lib/generateQRCode';
import { ID_CARD_FIELDS, mapStudentDataToFields } from '@/lib/idCardFieldMapper';
import { cropToCircular } from '@/lib/cropToCircle';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    // Fetch student from database
    const studentsCol = await collection('students');
    const student = await studentsCol.findOne({ _id: new ObjectId(id) });

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    // Load existing PDF template from public directory
    const templatePath = path.join(process.cwd(), 'public', 'st-id.pdf');
    const existingPdfBytes = await fs.readFile(templatePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get pages - your template has 2 pages (front and back)
    const pages = pdfDoc.getPages();
    const frontPage = pages[0]; // Page 1: Front side
    const backPage = pages[1] || null; // Page 2: Back side (optional)

    // Map student data
    const fields = mapStudentDataToFields(student);

    // Add text fields to front page
    const { FRONT } = ID_CARD_FIELDS;

    // Load Montserrat font from built-in StandardFonts (pdf-lib doesn't have Montserrat)
    // Using Helvetica-Bold as fallback for Montserrat
    const montserratFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Get page width for true center alignment
    const { width: pageWidth } = frontPage.getSize();

    // Add student name (true center on page)
    if (fields.name) {
      const nameWidth = montserratFont.widthOfTextAtSize(fields.name, FRONT.STUDENT_NAME.fontSize);
      const nameCenterX = (pageWidth - nameWidth) / 2;

      frontPage.drawText(fields.name, {
        x: nameCenterX,
        y: FRONT.STUDENT_NAME.y,
        size: FRONT.STUDENT_NAME.fontSize,
        font: montserratFont,
        color: rgb(0, 0.24, 0.44),
      });
    }

    // Add student ID number (true center on page, white text)
    if (fields.idNumber) {
      const idWidth = montserratFont.widthOfTextAtSize(fields.idNumber, FRONT.ID_NUMBER.fontSize);
      const idCenterX = (pageWidth - idWidth) / 2;

      frontPage.drawText(fields.idNumber, {
        x: idCenterX,
        y: FRONT.ID_NUMBER.y,
        size: FRONT.ID_NUMBER.fontSize,
        font: montserratFont,
        color: rgb(1, 1, 1),
      });
    }

    // Add course
    if (fields.course) {
      frontPage.drawText(fields.course, {
        x: FRONT.COURSE.x,
        y: FRONT.COURSE.y,
        size: FRONT.COURSE.fontSize,
        font: montserratFont,
        color: rgb(0, 0.24, 0.44),
      });
    }

    // Add batch (value only, no label)
    if (fields.batch) {
      frontPage.drawText(fields.batch, {
        x: FRONT.BATCH.x,
        y: FRONT.BATCH.y,
        size: FRONT.BATCH.fontSize,
        font: montserratFont,
        color: rgb(0, 0.24, 0.44),
      });
    }

    // Add duration (value only, no label)
    if (fields.duration) {
      frontPage.drawText(fields.duration, {
        x: FRONT.DURATION.x,
        y: FRONT.DURATION.y,
        size: FRONT.DURATION.fontSize,
        font: montserratFont,
        color: rgb(0, 0.24, 0.44),
      });
    }

    // Add student photo if available (circular - truly round)
    if (student.studentImage && student.studentImage.trim() !== '') {
      try {
        // Use cropToCircular to get a truly circular image
        const circularImageBuffer = await cropToCircular(student.studentImage);

        // Embed the circular PNG image
        const image = await pdfDoc.embedPng(circularImageBuffer);

        const photoConfig = FRONT.STUDENT_PHOTO;

        // Draw the circular image (it's already cropped to a circle)
        frontPage.drawImage(image, {
          x: photoConfig.x,
          y: photoConfig.y,
          width: photoConfig.width,
          height: photoConfig.height,
        });
      } catch (imgError) {
        console.warn('Failed to embed student photo:', imgError);
      }
    }

    // Generate QR code for back page
    let qrCodeImage = null;
    try {
      const qrCodeDataUrl = await generateStudentQRCode(student.idNumber);
      const qrCodeBase64 = qrCodeDataUrl.split(',')[1];
      const qrCodeBuffer = Buffer.from(qrCodeBase64, 'base64');
      qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer);
    } catch (qrError) {
      console.warn('Failed to generate QR code:', qrError);
      // Continue without QR code
    }

    // Add back page content (QR code only, no text)
    if (backPage && qrCodeImage) {
      const { QR_CODE } = ID_CARD_FIELDS.BACK;

      // Add QR code to back page (no extra text)
      backPage.drawImage(qrCodeImage, {
        x: QR_CODE.x,
        y: QR_CODE.y,
        width: QR_CODE.width,
        height: QR_CODE.height,
      });
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Return as downloadable PDF
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ID-Card-${student.idNumber || student._id}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('ID Card generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add support for POST method for testing (optional)
export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    return GET(new Request(`/api/admin/students/${id}/id-card`), { params: { id } });

  } catch (error) {
    console.error('POST ID Card generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
