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
    return res.data;
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
                setCertData(data[0]);
                setResult("success");
                setHasError(false);
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
                setCertData(data[0]); // because API returns array
                setResult("success");
                setHasError(false);
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
        <div className="min-h-screen bg-background py-12">
            {/* Header */}
            <header className="text-center mb-10">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.05 }}
                    className="text-3xl font-bold text-primary-700 tracking-tight mb-3"
                >
                    সার্টিফিকেট যাচাই করুন
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...spring, delay: 0.1 }}
                    className="text-muted-foreground text-balance"
                >
                    আপনার সার্টিফিকেটের সত্যতা যাচাই করতে নিচে স্টুডেন্ট আইডি লিখুন।
                </motion.p>
            </header>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.15 }}
                className={`card-surface p-8 mx-auto max-w-md md:p-10 ${hasError ? "animate-shake" : ""}`}
            >
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
                                className="pl-4 pr-12 py-3 h-12 w-full text-lg uppercase transition-all"
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
                                    className="h-8 w-8 rounded-full bg-primary-700 text-white flex items-center justify-center hover:bg-primary-600 disabled:opacity-50 disabled:hover:bg-primary-700 transition-colors"
                                >
                                    {result === "loading" ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <ArrowRight className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>

            {/* Results Area */}
            <div className="mt-8 max-w-lg mx-auto">
                <AnimatePresence mode="wait">
                    {result === "success" && certData && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={spring}
                            className="card-surface overflow-hidden border-2 border-emerald-100 dark:border-emerald-900 shadow-xl"
                        >
                            {/* Success Header */}
                            <div className="bg-emerald-50 dark:bg-emerald-950/20 px-8 py-6 flex items-center gap-4 border-b border-emerald-100 dark:border-emerald-900">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                    className="rounded-full bg-emerald-100 dark:bg-emerald-900 p-2 text-emerald-600 dark:text-emerald-400 shrink-0"
                                >
                                    <CheckCircle className="h-8 w-8" />
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Verified Certificate</h3>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                                        Authentic record found for ID: {searchedId}
                                    </p>
                                </div>
                            </div>

                            {/* Data Rows */}
                            <div className="grid gap-6 p-8 relative">
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                    <CheckCircle className="h-64 w-64" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                    <ResultRow
                                        label="Student Name"
                                        value={certData.studentName}
                                        delay={0.15}
                                    />
                                    <ResultRow
                                        label="Course Name"
                                        value={certData.course}
                                        delay={0.2}
                                    />
                                    <ResultRow
                                        label="Batch Number"
                                        value={certData.batchNumber}
                                        delay={0.25}
                                    />
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
                            className="card-surface overflow-hidden border-2 border-red-100 dark:border-red-900"
                        >
                            <div className="bg-red-50 dark:bg-red-950/20 px-8 py-6 flex items-center gap-4 border-b border-red-100 dark:border-red-900">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1 }}
                                    className="rounded-full bg-red-100 dark:bg-red-900 p-2 text-red-600 dark:text-red-400 shrink-0"
                                >
                                    <XCircle className="h-8 w-8" />
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Verification Failed</h3>
                                    <p className="text-sm text-red-600 dark:text-red-400 font-medium mt-0.5">
                                        No authentic record found
                                    </p>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-muted-foreground text-center">
                                    We couldn't find a valid student record matching ID{" "}
                                    <span className="font-mono font-semibold text-foreground px-1">{searchedId}</span>.
                                    <br />
                                    Please verify the ID and try again, or contact administration.
                                </p>
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
