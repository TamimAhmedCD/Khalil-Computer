"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Loader2, QrCode, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function StudentIDCardPage() {
  const params = useParams();
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/api/admin/students/${params.id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError(err.response?.data?.error || "Failed to load student");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [params.id]);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const response = await fetch(`/api/admin/students/${params.id}/id-card`);

      if (!response.ok) {
        throw new Error('Failed to generate ID card');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ID-Card-${student?.idNumber || params.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("ID card downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download ID card. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading student information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Student</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Student Not Found</h2>
            <Button onClick={() => router.back()} variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Student Details
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student ID Card</h1>
              <p className="text-gray-600 mt-1">
                Preview and download the ID card for {student.studentName}
              </p>
            </div>
          </div>
        </div>

        {/* ID Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Student Photo */}
                  <div className="flex-shrink-0">
                    {student.studentImage ? (
                      <img
                        src={student.studentImage}
                        alt={student.studentName}
                        className="w-40 h-48 rounded-xl object-cover border-4 border-gray-100 shadow-md"
                      />
                    ) : (
                      <div className="w-40 h-48 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-4 border-gray-100">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Student Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Student Name</label>
                      <p className="text-xl font-bold text-gray-900">{student.studentName}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">ID Number</label>
                        <p className="text-lg font-mono font-semibold text-primary-700">
                          {student.idNumber}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Course</label>
                        <p className="text-lg font-semibold text-gray-900">{student.course}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Batch Number</label>
                        <p className="text-lg font-semibold text-gray-900">{student.batchNumber}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Duration</label>
                        <p className="text-lg font-semibold text-gray-900">
                          {student.duration || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="w-5 h-5" />
                  ID Card Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-6 text-lg"
                  size="lg"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download ID Card
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    QR Code Verification
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    The ID card includes a QR code on the back side that links to a public verification page.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-900 font-medium mb-1">Verification URL:</p>
                    <p className="text-xs text-blue-700 break-all font-mono">
                      {process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/verify/{student.idNumber}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-gray-900 mb-2">What's Included</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Student photo and personal details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Course and batch information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>QR code for instant verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Professional ID card design</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6">
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Important Notes</h3>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• The ID card is generated as a 2-page PDF with front and back sides</li>
                    <li>• The QR code on the back can be scanned to verify student information</li>
                    <li>• Print on card stock for best results</li>
                    <li>• Standard ID card size: 85.6mm × 53.98mm (credit card size)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
