import { NextResponse } from 'next/server';
import { collection } from '@/lib/mongodb';

export async function GET(req, { params }) {
  try {
    const { studentId } = params;

    if (!studentId || studentId.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Find student by idNumber (not internal _id)
    const studentsCol = await collection('students');
    const student = await studentsCol.findOne({ idNumber: studentId });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          error: 'Student not found',
          suggestion: 'Please check the student ID and try again.'
        },
        { status: 404 }
      );
    }

    // Calculate student status based on course duration
    let status = 'Active';
    const currentDate = new Date();

    // Optional: Add logic to check validity based on course duration
    // Example: Check if student is still within course duration
    if (student.certificate_issued) {
      const certificateDate = new Date(student.certificate_issued);
      const diffMonths = (currentDate.getFullYear() - certificateDate.getFullYear()) * 12
        + (currentDate.getMonth() - certificateDate.getMonth());

      // Mark as "Graduated" if certificate issued more than 6 months ago
      if (diffMonths > 6) {
        status = 'Graduated';
      }
    }

    // Return only public verification data (no sensitive information)
    const verificationData = {
      studentName: student.studentName || '',
      idNumber: student.idNumber || '',
      studentImage: student.studentImage || null,
      course: student.course || '',
      batchNumber: student.batchNumber || '',
      gender: student.gender || '',
      status: status,
      verifiedAt: currentDate.toISOString(),
    };

    return NextResponse.json({
      success: true,
      student: verificationData,
      verificationInfo: {
        verifiedBy: 'Khalil Computer Verification System',
        verificationTimestamp: currentDate.toISOString(),
      }
    });

  } catch (error) {
    console.error('Verification API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Verification service temporarily unavailable',
        support: 'Please try again later or contact support.'
      },
      { status: 500 }
    );
  }
}

// Optional: Add support for checking multiple IDs at once
export async function POST(req) {
  try {
    const { studentIds } = await req.json();

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No student IDs provided' },
        { status: 400 }
      );
    }

    if (studentIds.length > 10) {
      return NextResponse.json(
        { success: false, error: 'Maximum 10 students per batch' },
        { status: 400 }
      );
    }

    const studentsCol = await collection('students');
    const students = await studentsCol.find({
      idNumber: { $in: studentIds }
    }).toArray();

    const verificationResults = students.map(student => ({
      studentId: student.idNumber,
      studentName: student.studentName,
      course: student.course,
      batchNumber: student.batchNumber,
      status: 'Verified',
    }));

    const notFoundIds = studentIds.filter(id =>
      !verificationResults.some(result => result.studentId === id)
    );

    return NextResponse.json({
      success: true,
      verifiedStudents: verificationResults,
      notFound: notFoundIds,
      totalFound: verificationResults.length,
      totalRequested: studentIds.length,
    });

  } catch (error) {
    console.error('Batch verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Batch verification failed' },
      { status: 500 }
    );
  }
}
