"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Search, FileText, ArrowRight } from "lucide-react";

export default function VerifyInvoiceSearchPage() {
  const router = useRouter();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = invoiceNumber.trim();
    if (!trimmed) return;

    setIsSearching(true);
    router.push(`/verify/invoice/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-5">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Verification</h1>
          <p className="text-gray-600 max-w-sm mx-auto">
            Enter your invoice number to verify its authenticity and view payment details
          </p>
        </div>

        {/* Search Card */}
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary-600" />
              <CardTitle className="text-xl">Verify Invoice</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="invoiceNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Invoice Number
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="invoiceNumber"
                    type="text"
                    placeholder="e.g. INV-2026-00001"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="pl-10 py-3 text-lg"
                    autoFocus
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  You can find the invoice number on your printed invoice or QR code receipt
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSearching || !invoiceNumber.trim()}
                className="w-full bg-primary-600 hover:bg-primary-700 py-3 text-lg"
              >
                {isSearching ? (
                  "Verifying..."
                ) : (
                  <>
                    Verify Invoice
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This verification system is powered by Khalil Computer</p>
          <p className="mt-1">
            Only invoices issued by{" "}
            <a href="https://khalilcomputer.com" className="text-primary-600 hover:underline">
              khalilcomputer.com
            </a>{" "}
            can be verified here
          </p>
        </div>
      </div>
    </div>
  );
}
