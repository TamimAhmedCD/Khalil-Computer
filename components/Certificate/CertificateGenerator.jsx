"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Download, Calendar, Award } from "lucide-react";
import jsPDF from "jspdf";

export default function CertificateGenerator({ student }) {
    const [loading, setLoading] = useState(false);

    // Download high-quality vector PDF
    const downloadCertificate = async () => {
        if (!student) return;
        setLoading(true);

        try {
            // Create PDF document in A4 landscape orientation
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });

            // Background color (cream white)
            pdf.setFillColor(250, 245, 230);
            pdf.rect(0, 0, 297, 210, 'F');

            // Gold border
            pdf.setDrawColor(212, 175, 55);
            pdf.setLineWidth(2);
            pdf.rect(10, 10, 277, 190);

            // Institute name
            pdf.setFontSize(42);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(25, 85, 140); // Dark blue
            pdf.text("KHALIL COMPUTER", 148.5, 40, { align: "center" });

            // Certificate title
            pdf.setFontSize(32);
            pdf.setTextColor(212, 175, 55); // Gold
            pdf.text("CERTIFICATE OF COMPLETION", 148.5, 60, { align: "center" });

            // Decorative line
            pdf.setDrawColor(212, 175, 55);
            pdf.setLineWidth(1);
            pdf.line(60, 70, 237, 70);

            // Presented to
            pdf.setFontSize(18);
            pdf.setTextColor(70, 70, 70);
            pdf.setFont("helvetica", "normal");
            pdf.text("This is to certify that", 148.5, 90, { align: "center" });

            // Student name
            pdf.setFontSize(48);
            pdf.setTextColor(25, 85, 140);
            pdf.setFont("helvetica", "bold");
            pdf.text(student.studentName.toUpperCase(), 148.5, 110, { align: "center" });

            // Course completed
            pdf.setFontSize(18);
            pdf.setTextColor(70, 70, 70);
            pdf.setFont("helvetica", "normal");
            pdf.text("has successfully completed the", 148.5, 125, { align: "center" });

            // Course name
            pdf.setFontSize(28);
            pdf.setTextColor(212, 175, 55);
            pdf.setFont("helvetica", "bold");
            pdf.text(student.course, 148.5, 140, { align: "center" });

            // Course details
            pdf.setFontSize(14);
            pdf.setTextColor(100, 100, 100);
            pdf.setFont("helvetica", "normal");
            pdf.text(`Duration: ${student.duration} | Batch: ${student.batchNumber}`, 148.5, 155, { align: "center" });

            // Completion date
            const today = new Date();
            const formattedDate = today.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            pdf.setFontSize(12);
            pdf.text(`Completed on: ${formattedDate}`, 148.5, 165, { align: "center" });

            // Student ID
            pdf.setFontSize(12);
            pdf.setTextColor(120, 120, 120);
            pdf.text(`Student ID: ${student.idNumber}`, 148.5, 172, { align: "center" });

            // Signatures
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.5);
            pdf.line(50, 180, 246, 180);

            // Principal signature
            pdf.setFontSize(12);
            pdf.setTextColor(70, 70, 70);
            pdf.text("______________________", 90, 192, { align: "center" });
            pdf.setFontSize(10);
            pdf.text("Principal", 90, 198, { align: "center" });
            pdf.setFont("helvetica", "bold");
            pdf.text("Khalil Computer Institute", 90, 205, { align: "center" });

            // Certificate ID
            const certificateId = `CERT-${student.idNumber}-${Date.now().toString().slice(-6)}`;
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Certificate ID: ${certificateId}`, 205, 192, { align: "center" });

            // Institute seal
            pdf.setFontSize(8);
            pdf.setTextColor(150, 150, 150);
            pdf.text("Seal", 246, 180, { align: "right" });
            pdf.setFontSize(6);
            pdf.text("www.khalilcomputer.com", 246, 185, { align: "right" });
            pdf.text("info@khalilcomputer.com", 246, 188, { align: "right" });

            // Download PDF
            pdf.save(`${student.studentName}-certificate.pdf`);

        } catch (err) {
            console.error("Download error:", err);
        }

        setLoading(false);
    };

    const today = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="space-y-6">
            {/* Native HTML Certificate Preview */}
            <div className="border rounded-xl p-4 bg-gray-50 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-indigo-600" />
                        Live Preview
                    </h2>
                </div>

                {/* The Certificate UI (Responsive Native HTML) */}
                <div className="w-full overflow-x-auto pb-4">
                    <div className="min-w-[800px] aspect-[1.414] bg-[#FAF5E6] p-8 relative mx-auto shadow-md">
                        {/* Gold Border */}
                        <div className="absolute inset-6 border-4 border-double border-[#D4AF37] pointer-events-none opacity-80"></div>

                        <div className="h-full flex flex-col items-center justify-center text-center px-12">
                            {/* Institute Name */}
                            <h1 className="text-4xl font-bold text-[#19558C] tracking-wide mb-2">
                                KHALIL COMPUTER
                            </h1>

                            {/* Title */}
                            <h2 className="text-2xl font-serif text-[#D4AF37] tracking-widest mb-6">
                                CERTIFICATE OF COMPLETION
                            </h2>

                            <div className="w-32 h-[2px] bg-[#D4AF37] mb-8"></div>

                            {/* Presentation */}
                            <p className="text-lg text-gray-600 font-medium mb-4">
                                This is to certify that
                            </p>

                            {/* Student Name */}
                            <h3 className="text-5xl font-bold text-[#19558C] mb-6 uppercase tracking-wider">
                                {student?.studentName || "Student Name"}
                            </h3>

                            {/* Body Text */}
                            <p className="text-lg text-gray-600 font-medium mb-4">
                                has successfully completed the
                            </p>

                            {/* Course */}
                            <h4 className="text-3xl font-bold text-[#D4AF37] mb-6">
                                {student?.course || "Course Name"}
                            </h4>

                            {/* Details */}
                            <div className="flex items-center gap-4 text-gray-600 font-medium mb-8">
                                <span>Duration: {student?.duration || "N/A"}</span>
                                <span className="text-gray-300">|</span>
                                <span>Batch: {student?.batchNumber || "N/A"}</span>
                            </div>

                            {/* Bottom Section Layout */}
                            <div className="w-full flex justify-between items-end mt-auto pt-8 border-t border-gray-300">
                                {/* Left Side - Date */}
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-800">Completed on: {today}</p>
                                    <p className="text-sm text-gray-500 mt-1">Student ID: {student?.idNumber || "N/A"}</p>
                                </div>

                                {/* Center - Signature */}
                                <div className="text-center pb-2">
                                    <div className="w-48 h-[1px] bg-gray-500 mb-2 mx-auto"></div>
                                    <p className="text-sm font-semibold text-gray-800">Principal</p>
                                    <p className="text-xs text-gray-500">Khalil Computer Institute</p>
                                </div>

                                {/* Right Side - Cert ID / Web */}
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">Certificate ID: CERT-{student?.idNumber}-XXXXXX</p>
                                    <p className="text-xs font-semibold text-gray-400 mt-2">www.khalilcomputer.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                    onClick={downloadCertificate}
                    disabled={loading}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg w-full sm:w-auto shadow-lg"
                >
                    <Download className="w-6 h-6 mr-3" />
                    {loading ? "Generating Quality PDF..." : "Download High-Quality PDF"}
                </Button>
            </div>

            {/* Verify Details */}
            <div className="bg-white border rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Data to be Printed
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Student Name:</span>
                            <span className="font-medium text-gray-900">{student?.studentName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Course:</span>
                            <span className="font-medium text-gray-900">{student?.course}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Batch & Duration:</span>
                            <span className="font-medium text-gray-900">{student?.batchNumber} ({student?.duration})</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Student ID:</span>
                            <span className="font-medium text-gray-900">{student?.idNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
