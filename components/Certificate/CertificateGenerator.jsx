"use client";
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import GraphicDesignCertificate from "./GraphicDesignCertificate";
import { Button } from "@/components/ui/button";

export default function CertificateGenerator({ student }) {
  const certRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadCertificate = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 3, // high-quality export
        backgroundColor: "white", // make background white
        style: { margin: 0, padding: 0 },
      });

      const link = document.createElement("a");
      link.download = `${student.studentName}-certificate.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating certificate", err);
    }
    setIsGenerating(false);
  };

  return (
    <div>
      {/* Certificate container */}
      <div ref={certRef} className="p-3 border bg-white rounded-2xl mb-5">
        <GraphicDesignCertificate student={student} />
      </div>

      {/* Download button */}
      <div className="flex gap-4">
        <Button
          onClick={downloadCertificate}
          variant="outline"
          className="text-green-600 border-green-200 hover:bg-green-50"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Download Certificate"}
        </Button>
      </div>
    </div>
  );
}
