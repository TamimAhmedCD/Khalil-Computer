'use client'
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";

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

export default function VerificationCard() {
    const [certId, setCertId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [result, setResult] = useState("idle");
    const [certData, setCertData] = useState(null);
    const [searchedId, setSearchedId] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!certId.trim()) return;

        setResult("loading");
        const formattedId = certId.trim().toUpperCase();
        setSearchedId(formattedId);

        try {
            const data = await fetchStudent(formattedId);
            console.log(data);

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
                    আপনার সার্টিফিকেটের সত্যতা যাচাই করতে নিচে সার্টিফিকেট নম্বর লিখুন।
                </motion.p>
            </header>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.15 }}
                className={`card-surface p-8 md:p-10 ${hasError ? "animate-shake" : ""}`}
            >
                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-2">
                        <Label
                            className="text-sm font-medium text-slate-700"
                        >
                            {"সার্টিফিকেট নম্বর"}
                        </Label>
                        <Input
                            type='text'
                            value={certId}
                            onChange={(e) => setCertId(e.target.value)}
                            placeholder="Ex: KC-2023-1024"
                            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            className="text-sm font-medium text-slate-700"
                        >
                            {"শিক্ষার্থীর নাম (ঐচ্ছিক)"}
                        </Label>
                        <Input
                            type='text'
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="নাম লিখুন"
                            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={result === "loading"}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary group disabled:opacity-70"
                    >
                        {result === "loading" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                যাচাই করুন
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>

            {/* Result */}
            <AnimatePresence mode="wait">
                {result === "success" && certData && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={spring}
                        className="mt-8 card-surface overflow-hidden border"
                    >
                        <div className="bg-gray-100 px-8 py-4 border-b border flex justify-between items-center">
                            <span className="text-success font-medium flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" /> যাচাইকৃত (Verified)
                            </span>
                            <span className="text-xs text-success font-mono uppercase tracking-wider">ID: {searchedId}</span>
                        </div>
                        <div className="p-8 space-y-4">
                            <ResultRow label="শিক্ষার্থীর নাম" value={certData.studentName} delay={0.1} />
                            <ResultRow label="কোর্সের নাম" value={certData.course} delay={0.2} />
                            <ResultRow label="সার্টিফিকেট নম্বর" value={searchedId} delay={0.3} />
                            <ResultRow label="প্রদানের তারিখ" value={certData.certificate_issued
                            } delay={0.4} />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-4 mt-4 border-t border-border flex justify-between items-center"
                            >
                                <span className="text-muted-foreground text-sm">স্ট্যাটাস</span>
                                <span className="px-3 py-1 bg-success-muted text-success rounded-full text-xs font-bold">সক্রিয়</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {result === "error" && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={spring}
                        className="mt-8 card-surface overflow-hidden border-error-border"
                    >
                        <div className="bg-error-muted px-8 py-5 flex items-center gap-3">
                            <XCircle className="w-5 h-5 text-error" />
                            <div>
                                <p className="text-error font-semibold">অবৈধ সার্টিফিকেট</p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    "{searchedId}" নম্বরের কোনো সার্টিফিকেট পাওয়া যায়নি।
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
