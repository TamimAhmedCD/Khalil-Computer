"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Download, Eye, Calendar } from "lucide-react";
import jsPDF from "jspdf";

export default function CertificateGenerator({ student }) {
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Generate certificate PDF
    const generateCertificate = async () => {
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

            // Course duration and batch
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

            // Signatures section
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

            // Generate PDF URL for preview
            const pdfBlob = pdf.output('blob');
            const url = window.URL.createObjectURL(pdfBlob);
            setPreviewUrl(url);

            // Download the certificate
            pdf.save(`${student.studentName}-certificate.pdf`);

        } catch (err) {
            console.error("Certificate generation error:", err);
        }

        setLoading(false);
    };

    // Download certificate only (no preview)
    const downloadCertificate = async () => {
        if (!student) return;
        setLoading(true);

        try {
            // Create PDF document
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
            pdf.setTextColor(25, 85, 140);
            pdf.text("KHALIL COMPUTER", 148.5, 40, { align: "center" });

            // Certificate title
            pdf.setFontSize(32);
            pdf.setTextColor(212, 175, 55);
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

    return (
        <div className="space-y-6">
            {/* Certificate preview section */}
            <div className="border rounded-xl p-4 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                        Certificate Preview
                    </h2>

                    <div className="flex gap-2">
                        <Button
                            onClick={generateCertificate}
                            disabled={loading}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            {loading ? "Generating..." : "Preview & Download"}
                        </Button>
                    </div>
                </div>

                {/* Certificate preview area */}
                {previewUrl ? (
                    <iframe
                        src={previewUrl}
                        className="w-full h-[400px] border rounded-lg mt-3"
                        title="Certificate Preview"
                    />
                ) : (
                    <div className="p-8 text-center bg-white border-2 border-dashed border-blue-200 rounded-lg">
                        <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl mb-4">
                            <GraduationCap className="w-12 h-12 text-indigo-600 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate Preview</h3>
                        <p className="text-gray-600 mb-4">
                            Click "Preview & Download" to generate a professional PDF certificate for{" "}
                            <span className="font-semibold">{student?.studentName}</span>
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>A4 Landscape Format</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-1">
                                <GraduationCap className="w-4 h-4" />
                                <span>Professional Design</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick download button */}
            <div className="flex justify-center">
                <Button
                    onClick={downloadCertificate}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3"
                >
                    <Download className="w-5 h-5 mr-2" />
                    {loading ? "Processing..." : "Download Certificate (PDF)"}
                </Button>
            </div>

            {/* Certificate details */}
            <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Certificate Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Student Name:</span>
                            <span className="font-medium text-gray-900">{student?.studentName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Course:</span>
                            <span className="font-medium text-gray-900">{student?.course}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium text-gray-900">{student?.duration}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Batch Number:</span>
                            <span className="font-medium text-gray-900">{student?.batchNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Student ID:</span>
                            <span className="font-medium text-gray-900">{student?.idNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Certificate Status:</span>
                            <span className="font-medium text-green-600">
                                {student?.certificate_issued ? "Issued" : "Ready for Issue"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
