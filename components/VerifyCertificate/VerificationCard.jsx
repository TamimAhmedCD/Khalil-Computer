'use client'
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const fetchStudent = async (id) => {
    const res = await axios.get(`/api/admin/students?idNumber=${id}`);
    return res.data.students || []; // Fixed: API returns { students: [...] }
};

const spring = { type: "spring", damping: 20, stiffness: 100 };

function ResultRow({ label, value, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay }}
            className="flex flex-col gap-1"
        >
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
            <span className="text-lg font-semibold text-foreground">{value}</span>
        </motion.div>
    );
}

function VerificationContent() {
    const searchParams = useSearchParams();
    const qUrlId = searchParams.get('id');

    const [certId, setCertId] = useState("");
    const [result, setResult] = useState("idle");
    const [certData, setCertData] = useState(null);
    const [searchedId, setSearchedId] = useState("");
    const [hasError, setHasError] = useState(false);

    // Auto-verify if ID is in the URL (e.g. from QR code scan)
    useEffect(() => {
        if (qUrlId) {
            setCertId(qUrlId);
            handleAutoVerify(qUrlId);
        }
    }, [qUrlId]);

    const handleAutoVerify = async (id) => {
        if (!id) return;
        setResult("loading");
        const formattedId = id.trim().toUpperCase();
        setSearchedId(formattedId);

        try {
            const data = await fetchStudent(formattedId);
            if (data && data.length > 0) {
                const student = data[0];

                // Check if certificate has been issued
                const hasCertificateIssued = student.certificate_issued &&
                    student.certificate_issued.trim() !== "" &&
                    student.certificate_issued !== "N/A";

                if (hasCertificateIssued) {
                    setCertData(student);
                    setResult("success");
                    setHasError(false);
                } else {
                    // Student exists but certificate not issued
                    setCertData(student);
                    setResult("not_issued");
                    setHasError(false);
                }
            } else {
                setCertData(null);
                setResult("error");
                setHasError(true);
                setTimeout(() => setHasError(false), 400);
            }
        } catch (error) {
            setCertData(null);
            setResult("error");
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!certId.trim()) return;

        setResult("loading");
        const formattedId = certId.trim().toUpperCase();
        setSearchedId(formattedId);

        try {
            const data = await fetchStudent(formattedId);

            if (data && data.length > 0) {
                const student = data[0];

                // Check if certificate has been issued
                const hasCertificateIssued = student.certificate_issued &&
                    student.certificate_issued.trim() !== "" &&
                    student.certificate_issued !== "N/A";

                if (hasCertificateIssued) {
                    setCertData(student);
                    setResult("success");
                    setHasError(false);
                } else {
                    // Student exists but certificate not issued
                    setCertData(student);
                    setResult("not_issued");
                    setHasError(false);
                }
            } else {
                setCertData(null);
                setResult("error");
                setHasError(true);
                setTimeout(() => setHasError(false), 400);
            }
        } catch (error) {
            setCertData(null);
            setResult("error");
        }
    };

    return (
        <div className="w-full">
            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.15 }}
                className={`bg-white shadow-2xl rounded-2xl p-8 max-w-2xl mx-auto md:p-10 border-t-4 border-t-primary-600 ${hasError ? "animate-shake" : ""}`}
            >
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">সার্টিফিকেট যাচাই করুন</h2>
                    <p className="text-gray-600 text-sm">
                        Student ID লিখুন এবং Verify করুন
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-2">
                        <Label
                            className="text-sm font-medium text-slate-700"
                        >
                            {"স্টুডেন্ট আইডি (Student ID)"}
                        </Label>
                        <div className="relative group">
                            <Input
                                id="certId"
                                type="text"
                                placeholder="যেমন: GD2024001"
                                className="pl-4 pr-12 py-3 h-12 w-full text-lg uppercase transition-all border-2 border-gray-200 focus:border-primary-600 rounded-lg"
                                value={certId}
                                onChange={(e) => {
                                    setCertId(e.target.value.toUpperCase());
                                    if (result === "error") setResult("idle");
                                }}
                            />
                            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2">
                                <button
                                    type="submit"
                                    disabled={!certId.trim() || result === "loading"}
                                    className="h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
                                >
                                    {result === "loading" ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <ArrowRight className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            আপনার সার্টিফিকেটে উল্লেখিত Student ID লিখুন
                        </p>
                    </div>
                </form>
            </motion.div>

            {/* Results Area */}
            <div className="mt-8 w-full max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {result === "success" && certData && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={spring}
                            className="bg-white overflow-hidden rounded-2xl border-2 border-emerald-500 shadow-2xl"
                        >
                            {/* Success Header */}
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6 flex items-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                    className="rounded-full bg-white p-2 text-emerald-600 shrink-0"
                                >
                                    <CheckCircle className="h-10 w-10" />
                                </motion.div>
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold">সার্টিফিকেট যাচাই সফল!</h3>
                                    <p className="text-emerald-100 text-sm font-medium mt-0.5">
                                        এই সার্টিফিকেটটি সম্পূর্ণ বৈধ। ID: {searchedId}
                                    </p>
                                </div>
                            </div>

                            {/* Data Rows */}
                            <div className="grid gap-6 p-8 relative">
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                    <CheckCircle className="h-96 w-96 text-emerald-200" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                    <ResultRow
                                        label="শিক্ষার্থীর নাম"
                                        value={certData.studentName}
                                        delay={0.15}
                                    />
                                    <ResultRow
                                        label="কোর্সের নাম"
                                        value={certData.course}
                                        delay={0.2}
                                    />
                                    <ResultRow
                                        label="ব্যাচ নাম্বার"
                                        value={certData.batchNumber || "N/A"}
                                        delay={0.25}
                                    />
                                    <ResultRow
                                        label="ফোন নাম্বার"
                                        value={certData.phoneNumber || "N/A"}
                                        delay={0.3}
                                    />
                                    {certData.enrollmentDate && (
                                        <ResultRow
                                            label="ভর্তির তারিখ"
                                            value={new Date(certData.enrollmentDate).toLocaleDateString('en-BD')}
                                            delay={0.35}
                                        />
                                    )}
                                    {certData.certificateIssued && (
                                        <ResultRow
                                            label="সার্টিফিকেট ইস্যু তারিখ"
                                            value={new Date(certData.certificateIssued).toLocaleDateString('en-BD')}
                                            delay={0.4}
                                        />
                                    )}
                                </div>

                                {/* Certificate Status */}
                                <div className="mt-4 pt-6 border-t border-gray-100 relative z-10">
                                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-emerald-700">✓ সার্টিফিকেটের অবস্থা: সক্রিয় ও বৈধ</p>
                                                <p className="text-xs text-emerald-600 mt-1">এই সার্টিফিকেটটি খলিল কম্পিউটার দ্বারা আনুষ্ঠানিকভাবে ইস্যু করা হয়েছে</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {result === "error" && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={spring}
                            className="bg-white overflow-hidden rounded-2xl border-2 border-red-500 shadow-xl"
                        >
                            <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 flex items-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                    className="rounded-full bg-white p-2 text-red-600 shrink-0"
                                >
                                    <XCircle className="h-10 w-10" />
                                </motion.div>
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold">সার্টিফিকেট যাচাই ব্যর্থ!</h3>
                                    <p className="text-red-100 text-sm font-medium mt-0.5">
                                        এই Student ID এর কোনো বৈধ সার্টিফিকেট পাওয়া যায়নি
                                    </p>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="bg-red-50 rounded-lg p-6 text-center border border-red-200">
                                    <p className="text-muted-foreground mb-4">
                                        Student ID <span className="font-mono font-semibold text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200">{searchedId}</span> এর জন্য কোনো বৈধ সার্টিফিকেট পাওয়া যায়নি।
                                    </p>
                                    <div className="space-y-3 max-w-md mx-auto">
                                        <p className="text-sm text-gray-600">
                                            দয়া করে নিচের বিষয়গুলো চেক করুন:
                                        </p>
                                        <ul className="text-sm text-gray-600 text-left space-y-1 list-disc pl-5 max-w-xs mx-auto">
                                            <li>Student ID সঠিকভাবে লিখেছেন কি?</li>
                                            <li>বড় হাতের অক্ষরে লিখেছেন কি?</li>
                                            <li>Student ID এ কোনো অতিরিক্ত স্পেস আছে কি?</li>
                                        </ul>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-red-200">
                                        <p className="text-sm text-gray-600">
                                            যদি মনে করেন এটি একটি ত্রুটি, দয়া করে আমাদের সাথে যোগাযোগ করুন:
                                        </p>
                                        <a
                                            href="tel:+8801715409109"
                                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            +৮৮০১৭১৫৪০৯১০৯
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {result === "not_issued" && certData && (
                        <motion.div
                            key="not_issued"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={spring}
                            className="bg-white overflow-hidden rounded-2xl border-2 border-amber-500 shadow-xl"
                        >
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 flex items-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                    className="rounded-full bg-white p-2 text-amber-600 shrink-0"
                                >
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </motion.div>
                                <div className="text-white">
                                    <h3 className="text-2xl font-bold">সার্টিফিকেট এখনও ইস্যু হয়নি</h3>
                                    <p className="text-amber-100 text-sm font-medium mt-0.5">
                                        এই শিক্ষার্থীর সার্টিফিকেট এখনও আনুষ্ঠানিকভাবে ইস্যু করা হয়নি
                                    </p>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <ResultRow
                                            label="শিক্ষার্থীর নাম"
                                            value={certData.studentName}
                                            delay={0.15}
                                        />
                                        <ResultRow
                                            label="কোর্সের নাম"
                                            value={certData.course}
                                            delay={0.2}
                                        />
                                        <ResultRow
                                            label="ব্যাচ নাম্বার"
                                            value={certData.batchNumber || "N/A"}
                                            delay={0.25}
                                        />
                                        <ResultRow
                                            label="ফোন নাম্বার"
                                            value={certData.phoneNumber || "N/A"}
                                            delay={0.3}
                                        />
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-blue-700 mb-1">সার্টিফিকেটের অবস্থা: বিলম্বিত</p>
                                                <p className="text-xs text-blue-600">
                                                    এই শিক্ষার্থীর সার্টিফিকেট এখনও ইস্যু করা হয়নি। সঠিক সময়ে কোর্স সম্পন্ন করার পর সার্টিফিকেট ইস্যু করা হবে।
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <p className="text-sm text-gray-600 mb-2">
                                            সার্টিফিকেট ইস্যু সম্পর্কে তথ্য:
                                        </p>
                                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                                            <li>কোর্স সম্পন্নের পর সার্টিফিকেট ইস্যু করা হয়</li>
                                            <li>সাধারণত কোর্স শেষ হওয়ার ১৫-২০ দিনের মধ্যে ইস্যু হয়</li>
                                            <li>সার্টিফিকেট ইস্যু সম্পর্কে প্রশ্ন থাকলে অফিসে যোগাযোগ করুন</li>
                                        </ul>
                                        <div className="mt-4 pt-3 border-t border-gray-200">
                                            <a
                                                href="tel:+8801715409109"
                                                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                </svg>
                                                সার্টিফিকেট সম্পর্কে তথ্য: +৮৮০১৭১৫৪০৯১০৯
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function VerificationCard() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>}>
            <VerificationContent />
        </Suspense>
    );
}
