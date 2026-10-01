"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Award, Download, Shield, QrCode, BookOpen, Clock, User, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";

// =========================================================================
// POSITION CONFIGURATION (in PDF Points: 1 pt = 1/72 inch)
// Page size: 841.89 pt x 595.28 pt (A4 Landscape)
// NOTE: PDF coordinate (0,0) is BOTTOM-LEFT corner of the page.
// Increase Y to move UP, decrease Y to move DOWN.
// Increase X to move RIGHT, decrease X to move LEFT.
// =========================================================================
const POSITIONS = {
    studentName: {
        x: 68,
        y: 315,
        size: 38,
        color: rgb(0, 62 / 255, 111 / 255),
        font: "bold",
    },
    courseName: {
        x: 68,
        y: 253,
        size: 26,
        color: rgb(216 / 255, 166 / 255, 46 / 255),
        align: "left",
        font: "bold",
    },
    courseDescription: {
        x: 68,
        y: 222,
        size: 14,
        lineHeight: 18,
        maxWidth: 510,
        color: rgb(0.2, 0.2, 0.2),
        align: "left",
        font: "regular",
    },
    duration: {
        x: 279,
        y: 52,
        size: 9.6,
        color: rgb(0, 62 / 255, 111 / 255),
        font: "bold",
    },
    certificate_issued: {
        x: 410,
        y: 52,
        size: 9.6,
        color: rgb(0, 62 / 255, 111 / 255),
        font: "bold",
    },
    studentId: {
        x: 539,
        y: 52,
        size: 9.6,
        color: rgb(0, 62 / 255, 111 / 255),
        font: "bold",
    },
    qrCode: {
        x: 67,
        y: 27,
        size: 67,
    },
};

// =========================================================================
// COURSE DESCRIPTIONS FOR 3 TYPES OF COURSES
// =========================================================================
function getCourseDescription(courseName, studentName) {
    const course = (courseName || "").toLowerCase();
    const name = studentName || "the student";

    if (course.includes("graphic") || course.includes("design")) {
        return "demonstrating proficiency in graphic design principles and the practical skills required to create professional and effective designs.";
    }

    if (course.includes("web") || course.includes("development") || course.includes("full stack") || course.includes("frontend")) {
        return "demonstrating proficiency in web development, including HTML5, CSS3, JavaScript, modern frontend frameworks, responsive UI design, and web application fundamentals.";
    }

    if (course.includes("basic") || course.includes("office") || course.includes("computer")) {
        return "demonstrating proficiency in basic computer operations, essential software applications, and fundamental digital skills.";
    }

    return "This is to certify that " + name + " has successfully completed the " + (courseName || "training") + " course, demonstrating proficiency, dedication, and excellence in their practical studies.";
}

export default function CertificateGenerator({ student }) {
    const [loading, setLoading] = useState(false);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);
    const [currentCertificateId, setCurrentCertificateId] = useState("");
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    const hasCertificateIssued = Boolean(student?.certificate_issued && String(student.certificate_issued).trim() !== "");

    useEffect(() => {
        if (student?.idNumber) {
            const dateSource = student?.certificate_issued ? new Date(student.certificate_issued) : new Date();
            const year = isNaN(dateSource.getTime()) ? new Date().getFullYear() : dateSource.getFullYear();
            const month = isNaN(dateSource.getTime()) ? String(new Date().getMonth() + 1).padStart(2, "0") : String(dateSource.getMonth() + 1).padStart(2, "0");
            const certId = "KC-" + student.idNumber + "-" + year + month;
            setCurrentCertificateId(certId);

            const verificationUrl = window.location.origin + "/verify-certificate?id=" + student.idNumber;
            generateQRCode(verificationUrl);
        }
    }, [student]);

    const generateQRCode = async (url) => {
        try {
            const qrDataUrl = await QRCode.toDataURL(url, {
                width: 250,
            });
            setQrCodeDataUrl(qrDataUrl);
        } catch (err) {
            console.error("QR code generation error:", err);
        }
    };

    const wrapText = (text, maxWidth, font, fontSize) => {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        for (const word of words) {
            const testLine = currentLine ? currentLine + " " + word : word;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (testWidth <= maxWidth) {
                currentLine = testLine;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
    };

    const getFormattedIssueDate = () => {
        if (!student?.certificate_issued) return "NOT ISSUED";
        const dateObj = new Date(student.certificate_issued);
        if (isNaN(dateObj.getTime())) return student.certificate_issued;
        return dateObj.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // =========================================================================
    // MAIN DOWNLOAD: OVERLAY DATA ON TEMPLATE PDF WITH MONTSERRAT FONT
    // =========================================================================
    const downloadCertificate = async () => {
        if (!student || !hasCertificateIssued) return;
        setLoading(true);
        setDownloadSuccess(false);

        try {
            // 1. Fetch template PDF and Montserrat fonts in parallel
            const [templateRes, fontRegularRes, fontBoldRes, fontSemiBoldRes] = await Promise.all([
                fetch("/certificate-template.pdf"),
                fetch("/fonts/Montserrat-Regular.ttf"),
                fetch("/fonts/Montserrat-Bold.ttf"),
                fetch("/fonts/Montserrat-SemiBold.ttf"),
            ]);

            if (!templateRes.ok) throw new Error("Failed to load template PDF (" + templateRes.status + ")");

            const [templateBytes, regularFontBytes, boldFontBytes, semiBoldFontBytes] = await Promise.all([
                templateRes.arrayBuffer(),
                fontRegularRes.arrayBuffer(),
                fontBoldRes.arrayBuffer(),
                fontSemiBoldRes.arrayBuffer(),
            ]);

            // 2. Load PDF and register fontkit for custom fonts
            const pdfDoc = await PDFDocument.load(templateBytes);
            pdfDoc.registerFontkit(fontkit);

            const page = pdfDoc.getPages()[0];
            const { width } = page.getSize();

            // 3. Embed Montserrat fonts
            const montserratRegular = await pdfDoc.embedFont(regularFontBytes);
            const montserratBold = await pdfDoc.embedFont(boldFontBytes);
            const montserratSemiBold = await pdfDoc.embedFont(semiBoldFontBytes);

            const getFont = (fontKey) => {
                if (fontKey === "bold") return montserratBold;
                if (fontKey === "semibold") return montserratSemiBold;
                return montserratRegular;
            };

            const studentName = student.studentName || "Student Name";
            const courseName = student.course || "Training Course";
            const duration = student.duration || "N/A";
            const idNumber = student.idNumber || "N/A";
            const certificate_issued = getFormattedIssueDate();
            const courseDesc = getCourseDescription(courseName, studentName);

            // =================================================================
            // 4. DRAW DYNAMIC TEXT ON PDF USING MONTSERRAT
            // =================================================================

            // A. Student Name (Bold)
            const nameFont = getFont(POSITIONS.studentName.font);
            const nameSize = POSITIONS.studentName.size;
            const nameWidth = nameFont.widthOfTextAtSize(studentName, nameSize);
            const nameX = POSITIONS.studentName.x !== undefined
                ? POSITIONS.studentName.x
                : (width - nameWidth) / 2;
            page.drawText(studentName, {
                x: nameX,
                y: POSITIONS.studentName.y,
                size: nameSize,
                font: nameFont,
                color: POSITIONS.studentName.color,
            });

            // B. Course Name (Bold)
            const courseFont = getFont(POSITIONS.courseName.font);
            const courseSize = POSITIONS.courseName.size;
            const courseWidth = courseFont.widthOfTextAtSize(courseName, courseSize);
            const courseX = POSITIONS.courseName.x !== undefined
                ? POSITIONS.courseName.x
                : (width - courseWidth) / 2;
            page.drawText(courseName, {
                x: courseX,
                y: POSITIONS.courseName.y,
                size: courseSize,
                font: courseFont,
                color: POSITIONS.courseName.color,
            });

            // C. Course Description (Multi-line, Regular)
            const descFont = getFont(POSITIONS.courseDescription.font);
            const descLines = wrapText(courseDesc, POSITIONS.courseDescription.maxWidth, descFont, POSITIONS.courseDescription.size);
            let descY = POSITIONS.courseDescription.y;
            descLines.forEach((line) => {
                const lineWidth = descFont.widthOfTextAtSize(line, POSITIONS.courseDescription.size);
                const lineX = POSITIONS.courseDescription.x !== undefined
                    ? POSITIONS.courseDescription.x
                    : (width - lineWidth) / 2;
                page.drawText(line, {
                    x: lineX,
                    y: descY,
                    size: POSITIONS.courseDescription.size,
                    font: descFont,
                    color: POSITIONS.courseDescription.color,
                });
                descY -= POSITIONS.courseDescription.lineHeight;
            });

            // D. Duration
            const durValueFont = getFont(POSITIONS.duration.font);
            page.drawText(duration, {
                x: POSITIONS.duration.x,
                y: POSITIONS.duration.y,
                size: POSITIONS.duration.size,
                font: durValueFont,
                color: POSITIONS.duration.color,
            });

            // E. Completion / Issue Date
            const dateValueFont = getFont(POSITIONS.certificate_issued.font);
            page.drawText(certificate_issued, {
                x: POSITIONS.certificate_issued.x,
                y: POSITIONS.certificate_issued.y,
                size: POSITIONS.certificate_issued.size,
                font: dateValueFont,
                color: POSITIONS.certificate_issued.color,
            });

            // F. Student ID
            const idValueFont = getFont(POSITIONS.studentId.font);
            page.drawText(idNumber, {
                x: POSITIONS.studentId.x,
                y: POSITIONS.studentId.y,
                size: POSITIONS.studentId.size,
                font: idValueFont,
                color: POSITIONS.studentId.color,
            });

            // =================================================================
            // 5. DRAW QR CODE ON PDF
            // =================================================================
            if (qrCodeDataUrl) {
                const qrImageBytes = await fetch(qrCodeDataUrl).then((res) => res.arrayBuffer());
                const qrImage = await pdfDoc.embedPng(qrImageBytes);

                page.drawImage(qrImage, {
                    x: POSITIONS.qrCode.x,
                    y: POSITIONS.qrCode.y,
                    width: POSITIONS.qrCode.size,
                    height: POSITIONS.qrCode.size,
                });
            }

            // =================================================================
            // 6. SAVE AND TRIGGER DOWNLOAD
            // =================================================================
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "Certificate-" + studentName.replace(/\s+/g, "_") + "-" + currentCertificateId + ".pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setDownloadSuccess(true);
            setTimeout(() => setDownloadSuccess(false), 4000);
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("Failed to generate PDF: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const formattedIssueDate = getFormattedIssueDate();
    const courseDescription = getCourseDescription(student?.course, student?.studentName);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Award className="w-6 h-6 text-[#FF6B35]" />
                        Official Certificate Generator
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Overlays dynamic student data onto the official template PDF for{" "}
                        <span className="font-semibold text-[#FF6B35]">{student?.studentName}</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                    <Shield className="w-4 h-4" />
                    <span>Montserrat · PDF-Lib Engine</span>
                </div>
            </div>

            {/* Warning if certificate date is not set */}
            {!hasCertificateIssued && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-amber-900">Certificate Not Issued Yet</h4>
                        <p className="text-xs text-amber-700 mt-0.5">
                            Please set the <strong>Certificate Issued Date</strong> in the student edit form to enable the official certificate download.
                        </p>
                    </div>
                </div>
            )}

            {/* Live Certificate Preview Card */}
            <div className="border rounded-xl p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl relative min-h-[500px] font-montserrat">
                {/* Visual Header */}
                <div className="flex justify-between items-start border-b pb-6 mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#FF6B35] text-white rounded-lg flex items-center justify-center font-bold text-xl shadow">
                                KC
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-gray-900">KHALIL COMPUTER</h3>
                                <p className="text-xs text-gray-500">Government Approved Training Institute</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                            Certificate of Completion
                        </span>
                        <p className="text-xs text-gray-500 mt-1 font-mono">
                            {currentCertificateId}
                        </p>
                    </div>
                </div>

                {/* Central Certificate Body */}
                <div className="text-center py-6 space-y-4">
                    <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                        This is to certify that
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 py-2 border-b-2 border-[#FF6B35]/30 inline-block px-8">
                        {student?.studentName || "Student Full Name"}
                    </h1>

                    <p className="text-sm text-gray-600">
                        has successfully completed the prescribed course of study in
                    </p>

                    <h2 className="text-2xl font-bold text-[#FF6B35]">
                        {student?.course || "Course Name"}
                    </h2>

                    <p className="max-w-2xl mx-auto text-sm text-gray-600 leading-relaxed italic bg-white/80 p-4 rounded-lg border border-gray-100 shadow-sm">
                        &quot;{courseDescription}&quot;
                    </p>
                </div>

                {/* Bottom Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t mt-6 items-center">
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#FF6B35]" />
                            <span>Duration: <strong className="text-gray-900">{student?.duration || "N/A"}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#FF6B35]" />
                            <span>Batch: <strong className="text-gray-900">{student?.batchNumber || "N/A"}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#FF6B35]" />
                            <span>Issue Date: <strong className={hasCertificateIssued ? "text-gray-900" : "text-amber-600"}>{formattedIssueDate}</strong></span>
                        </div>
                    </div>

                    <div className="text-center">
                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Student ID Number</span>
                        <span className="font-mono font-bold text-lg text-gray-900">{student?.idNumber || "N/A"}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center md:items-end">
                        <div className="bg-white p-2 rounded-lg border shadow-sm">
                            {qrCodeDataUrl ? (
                                <img src={qrCodeDataUrl} alt="Verification QR Code" className="w-24 h-24" />
                            ) : (
                                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded">
                                    <QrCode className="w-10 h-10 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 font-medium flex items-center gap-1">
                            <Shield className="w-3 h-3 text-green-600" />
                            Scan to Verify
                        </p>
                    </div>
                </div>
            </div>

            {/* Download Button */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button
                    onClick={downloadCertificate}
                    disabled={loading || !hasCertificateIssued}
                    size="lg"
                    className={`text-white px-10 py-6 text-lg w-full sm:w-auto shadow-xl transition-all duration-200 ${
                        !hasCertificateIssued
                            ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed opacity-75"
                            : "bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#FF6B35]"
                    }`}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Embedding Data into Template PDF...
                        </>
                    ) : !hasCertificateIssued ? (
                        <>
                            <AlertCircle className="w-6 h-6 mr-3" />
                            Set Certificate Issue Date to Download
                        </>
                    ) : downloadSuccess ? (
                        <>
                            <CheckCircle2 className="w-6 h-6 mr-3 text-white" />
                            Certificate Downloaded!
                        </>
                    ) : (
                        <>
                            <Download className="w-6 h-6 mr-3" />
                            Download Official Certificate (PDF)
                        </>
                    )}
                </Button>
            </div>

            {/* Feature Highlights */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-[#FF6B35]" />
                    7 Dynamic Data Overlays · Montserrat Font
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-orange-50/70 p-3 rounded-lg border border-orange-100">
                        <span className="font-semibold text-gray-900 block">1. Student Name</span>
                        <span className="text-gray-600">Montserrat Bold centered</span>
                    </div>
                    <div className="bg-orange-50/70 p-3 rounded-lg border border-orange-100">
                        <span className="font-semibold text-gray-900 block">2. Course Name</span>
                        <span className="text-gray-600">Montserrat Bold gold</span>
                    </div>
                    <div className="bg-orange-50/70 p-3 rounded-lg border border-orange-100">
                        <span className="font-semibold text-gray-900 block">3. Course Description</span>
                        <span className="text-gray-600">Auto-selected for 3 types</span>
                    </div>
                    <div className="bg-orange-50/70 p-3 rounded-lg border border-orange-100">
                        <span className="font-semibold text-gray-900 block">4. Live QR Code</span>
                        <span className="text-gray-600">Embeds verification link</span>
                    </div>
                    <div className="bg-orange-50/70 p-3 rounded-lg border border-orange-100">
                        <span className="font-semibold text-gray-900 block">5. Course Duration</span>
                        <span className="text-gray-600">Official duration</span>
                    </div>
                    <div className="bg-orange-50/70 p-3 rounded-lg border border-orange-100">
                        <span className="font-semibold text-gray-900 block">6. Completion Date</span>
                        <span className="text-gray-600">Admin issued date</span>
                    </div>
                    <div className="bg-orange-50/70 p-3 rounded-lg border border-orange-100">
                        <span className="font-semibold text-gray-900 block">7. Student &amp; Cert ID</span>
                        <span className="text-gray-600">Unique searchable ID</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <span className="font-semibold text-green-900 block">✓ Montserrat Font</span>
                        <span className="text-green-700">3 weights embedded</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
