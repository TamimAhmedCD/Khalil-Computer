"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, User, Calendar, GraduationCap, Phone, Home, FileText } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

export default function VerifyStudentPage() {
  const params = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationTime, setVerificationTime] = useState(null);

  useEffect(() => {
    const verifyStudent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/verify/${params.studentId}`);

        if (res.data.success) {
          setStudent(res.data.student);
          setVerificationTime(new Date());
        } else {
          setError(res.data.error || "Verification failed");
        }
      } catch (err) {
        setError(err.response?.data?.error || "Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params.studentId) {
      verifyStudent();
    }
  }, [params.studentId]);

  const handleCopyVerification = () => {
    const verificationText = `✅ Verified Student ID: ${student?.idNumber}\n` +
      `👤 Name: ${student?.studentName}\n` +
      `📚 Course: ${student?.course}\n` +
      `🎓 Batch: ${student?.batchNumber}\n` +
      `⏰ Time: ${format(verificationTime || new Date(), "PPpp")}\n` +
      `🔗 Verified by: Khalil Computer`;

    navigator.clipboard.writeText(verificationText)
      .then(() => toast.success("Verification copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
              <h2 className="text-xl font-bold text-gray-800">Verifying Student</h2>
              <p className="text-gray-600">
                Checking student information...
              </p>
              <div className="text-sm text-gray-500">
                ID: {params.studentId}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <XCircle className="w-16 h-16 text-red-500" />
              <h2 className="text-xl font-bold text-gray-800">Verification Failed</h2>
              <p className="text-red-600">{error}</p>
              <div className="text-sm text-gray-500 mt-2">
                Student ID: {params.studentId}
              </div>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Verification System
          </h1>
          <p className="text-gray-600">
            Official student verification from Khalil Computer
          </p>
        </div>

        {/* Verification Status Card */}
        <Card className="shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Verified Successfully</CardTitle>
                  <p className="text-green-100">Student information confirmed</p>
                </div>
              </div>
              <Badge className="bg-white text-green-700 font-bold px-3 py-1">
                {student.status}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info Card */}
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-primary-600" />
                <CardTitle className="text-xl">Student Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Student Photo */}
                <div className="flex-shrink-0">
                  {student.studentImage ? (
                    <div className="relative">
                      <img
                        src={student.studentImage}
                        alt={student.studentName}
                        className="w-40 h-48 rounded-xl object-cover border-4 border-gray-100 shadow-sm"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-600" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-40 h-48 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-4 border-gray-100">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Student Details */}
                <div className="flex-1 space-y-4">
                  {/* Name and ID */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{student.studentName}</h2>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-gray-600">ID Number:</span>
                      <span className="font-mono font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-lg">
                        {student.idNumber}
                      </span>
                    </div>
                  </div>

                  {/* Course Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <GraduationCap className="w-4 h-4" />
                        <span className="text-sm font-medium">Course</span>
                      </div>
                      <p className="font-semibold text-gray-900">{student.course}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Batch</span>
                      </div>
                      <p className="font-semibold text-gray-900">{student.batchNumber}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm font-medium">Gender</span>
                      </div>
                      <p className="font-semibold text-gray-900">{student.gender || "Not specified"}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm font-medium">Verification</span>
                      </div>
                      <Badge
                        variant={student.status === "Active" ? "success" : "secondary"}
                        className="text-sm"
                      >
                        {student.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Verification Details */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        Verification Time
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {verificationTime ? format(verificationTime, "PPpp") : format(new Date(), "PPpp")}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        This verification is valid for official purposes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Actions Card */}
          <Card className="shadow-md">
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-600" />
                <CardTitle className="text-xl">Verification Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <Button
                  onClick={handleCopyVerification}
                  className="w-full bg-primary-600 hover:bg-primary-700"
                >
                  Copy Verification Details
                </Button>

                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="w-full"
                >
                  Print Verification
                </Button>

                <div className="text-center">
                  <div className="inline-block p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Scan QR Code on ID Card</div>
                    <div className="text-xs text-gray-500">
                      Shows this verification page
                    </div>
                  </div>
                </div>
              </div>

              {/* Institution Info */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">Institution Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Khalil Computer Training Institute</p>
                  <p>Official Student Verification System</p>
                  <p className="mt-3 text-xs text-gray-500">
                    This verification is digitally confirmed and can be used for official purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Khalil Computer - All rights reserved</p>
          <p className="mt-1">
            For verification issues, contact: support@khalilcomputer.com
          </p>
        </div>
      </div>
    </div>
  );
}
