"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, CreditCard, Building2, GraduationCap, Calendar, Hash, Mail, Phone, Globe } from "lucide-react"
import Image from "next/image"
import { toPng } from "html-to-image"

export default function StudentCardGenerator({ student }) {
    const frontRef = useRef(null)
    const backRef = useRef(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const downloadCard = async (type) => {
        setIsGenerating(true)

        try {
            const options = {
                cacheBust: true,
                quality: 1,
                pixelRatio: 3,
                skipAutoScale: true, // Prevent automatic scaling
                style: {
                    margin: '0', // Remove any margins
                    padding: '0', // Remove any padding
                },
                backgroundColor: null, // Set to null for transparent background
            }

            if (type === "front" || type === "both") {
                const frontDataUrl = await toPng(frontRef.current, {
                    ...options,
                    filter: (node) => {
                        // Exclude the download button from the capture
                        return !(node.classList &&
                            node.classList.contains('download-button-exclude'))
                    }
                })
                const link = document.createElement("a")
                link.download = `${student.studentName}-student-card-front.png`
                link.href = frontDataUrl
                link.click()
            }

            if (type === "back" || type === "both") {
                const backDataUrl = await toPng(backRef.current, {
                    ...options,
                    filter: (node) => {
                        // Exclude the download button from the capture
                        return !(node.classList &&
                            node.classList.contains('download-button-exclude'))
                    }
                })
                const link = document.createElement("a")
                link.download = `${student.studentName}-student-card-back.png`
                link.href = backDataUrl
                link.click()
            }
        } catch (err) {
            console.error("Error generating image", err)
        }

        setIsGenerating(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">Student ID Card</h3>
                    <p className="text-sm text-gray-500">Download professional student identification cards</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Front Card Preview */}
                <Card className="border-2 border-primary-200">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            Front Side
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div ref={frontRef} className="bg-white w-[348px] h-[552.71px] mx-auto p-0 m-0">
                            <div className="w-full h-full bg-white border-gray-100 overflow-hidden p-0 m-0">
                                {/* Header */}
                                <div className="bg-[#00558C] px-6 pt-8 pb-4">
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center space-x-2">
                                            <Image src='/logo.svg' width={120} height={100} alt='logo' />
                                        </div>
                                    </div>
                                </div>

                                {/* Student Photo Section */}
                                <div className="px-6 py-4 text-center">
                                    <div className="inline-block">
                                        <img
                                            src={student.studentImage}
                                            alt="Student"
                                            className="w-26 h-26 rounded-full object-cover border-4 border-[#00558C]/15 shadow-lg"
                                        />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mt-1 mb-1">
                                        {student.studentName}
                                    </h2>
                                    <div className="w-12 h-1 bg-[#00558C] rounded mx-auto"></div>
                                </div>

                                {/* Details Section */}
                                <div className="px-6 pb-6 space-y-3">
                                    <div className="bg-[#00558C]/7 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <GraduationCap className="w-5 h-5 text-[#00558C]" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Course
                                                </p>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {student.course}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Hash className="w-4 h-4 text-[#00558C]" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Batch
                                                </p>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {student.batchNumber}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Calendar className="w-4 h-4 text-[#00558C]" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Duration
                                                </p>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {student.duration}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ID Number */}
                                    <div className="bg-[#00558C] rounded-xl p-4 text-center">
                                        <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">
                                            Student ID Number
                                        </p>
                                        <p className="text-white text-lg font-bold tracking-wider">
                                            {student.idNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => downloadCard("front")}
                            disabled={isGenerating}
                            variant="outline"
                            className="w-full border-slate-300 hover:bg-slate-50 mt-3 download-button-exclude"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Front
                        </Button>
                    </CardContent>
                </Card>

                {/* Back Card Preview */}
                <Card className="border-2 border-slate-200">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-slate-600" />
                            Back Side
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div ref={backRef} className="bg-white w-[348px] h-[552.71px] mx-auto p-0 m-0">
                            <div className="w-full h-full bg-white overflow-hidden p-0 m-0">
                                {/* Header */}
                                <div className="bg-[#00558C] px-6 pt-10 pb-7 flex justify-center">
                                    <Image src="/logo-2-01.svg" width={240} height={60} alt="logo" />
                                </div>

                                {/* Validity & Contact Info */}
                                <div className="px-6 py-6 space-y-4">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                            Contact Information
                                        </h4>

                                        <div className="flex items-center space-x-3 p-3 bg-[#00558C]/5 rounded-lg">
                                            <Mail className="w-5 h-5 text-[#00558C]" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Email
                                                </p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    info@khalilcomputer.com
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 bg-[#00558C]/5 rounded-lg">
                                            <Phone className="w-5 h-5 text-[#00558C]" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Website
                                                </p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    www.khalilcomputer.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 bg-[#00558C]/5 rounded-lg">
                                            <Globe className="w-5 h-5 text-[#00558C]" />
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                    Emergency Contact
                                                </p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    +880 171 540 9109
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Image src="/qrcode.svg" width={80} height={80} alt="qr" />
                                        </div>
                                        <div>
                                            <Image src="/authorized.svg" width={120} height={120} alt="signature" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => downloadCard("back")}
                            disabled={isGenerating}
                            variant="outline"
                            className="w-full border-slate-300 hover:bg-slate-50 mt-3 download-button-exclude"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Back
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Download Both Button */}
            <div className="flex justify-center">
                <Button
                    onClick={() => downloadCard("both")}
                    disabled={isGenerating}
                    size="lg"
                    className="bg-primary-700 hover:bg-primary-600 text-white px-8 download-button-exclude"
                >
                    <Download className="w-5 h-5 mr-2" />
                    {isGenerating ? "Generating..." : "Download Both Cards"}
                </Button>
            </div>
        </div>
    )
}