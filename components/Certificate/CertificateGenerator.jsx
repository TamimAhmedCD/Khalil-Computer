"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CertificateGenerator({ student }) {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 🔥 Preview Certificate (DOCX → PDF from backend)
  const previewCertificate = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/certificate/${student._id}`
      );

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      setPreviewUrl(url);
    } catch (err) {
      console.log("Preview error:", err);
    }

    setLoading(false);
  };

  // 🔥 Download Certificate
  const downloadCertificate = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/certificate/${student._id}`
      );

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${student.studentName}-certificate.docx`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Download error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">

      {/* 🔥 Preview Container */}
      <div className="border rounded-xl p-4 bg-white shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">
            Certificate Preview
          </h2>

          <Button
            onClick={previewCertificate}
            disabled={loading}
            variant="outline"
          >
            {loading ? "Loading..." : "Load Preview"}
          </Button>
        </div>

        {/* 🔥 PDF Preview */}
        {previewUrl && (
          <iframe
            src={previewUrl}
            className="w-full h-[500px] border rounded-lg"
          />
        )}
      </div>

      {/* 🔘 Actions */}
      <div className="flex gap-4">
        <Button
          onClick={downloadCertificate}
          disabled={loading || !student.certificate_issued}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? "Processing..." : "Download Certificate"}
        </Button>
      </div>

    </div>
  );
}