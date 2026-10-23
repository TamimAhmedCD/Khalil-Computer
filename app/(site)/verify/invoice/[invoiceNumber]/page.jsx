"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, FileText, Calendar, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function VerifyInvoicePage() {
  const params = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationTime] = useState(new Date());

  useEffect(() => {
    const verifyInvoice = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://admin.khalilcomputer.com/api/public/invoice/${params.invoiceNumber}`
        );

        if (res.data.success) {
          setInvoice(res.data.invoice);
        } else {
          setError(res.data.error || "Invoice not found");
        }
      } catch (err) {
        setError(
          err.response?.data?.error || "Unable to verify invoice. Please check the invoice number and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.invoiceNumber) {
      verifyInvoice();
    }
  }, [params.invoiceNumber]);

  const handleCopyInvoice = () => {
    const invoiceText =
      `✅ Verified Invoice\n` +
      `📄 Invoice: ${invoice?.invoiceNumber}\n` +
      `👤 Customer: ${invoice?.customerName}\n` +
      `📅 Date: ${invoice?.invoiceDate}\n` +
      `💰 Total: ${invoice?.grandTotal} BDT\n` +
      `✓ Paid: ${invoice?.paidAmount} BDT\n` +
      `⚠ Due: ${invoice?.dueAmount} BDT\n` +
      `📊 Status: ${invoice?.status}\n` +
      `🔗 Verified by Khalil Computer`;

    navigator.clipboard
      .writeText(invoiceText)
      .then(() => toast.success("Invoice details copied"))
      .catch(() => toast.error("Failed to copy"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
              <h2 className="text-xl font-bold text-gray-800">Verifying Invoice</h2>
              <p className="text-gray-600">Checking invoice information...</p>
              <div className="text-sm text-gray-500 font-mono">
                {params.invoiceNumber}
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
              <div className="text-sm text-gray-500 mt-2 font-mono">
                Invoice: {params.invoiceNumber}
              </div>
              <Button
                onClick={() => (window.location.href = "/verify/invoice")}
                variant="outline"
                className="mt-2"
              >
                Try Another Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPaid = invoice.status === "PAID";
  const isPartial = invoice.status === "PARTIAL";

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Verification</h1>
          <p className="text-gray-600">Official invoice verification from Khalil Computer</p>
        </div>

        {/* Verification Status Card */}
        <Card className="shadow-lg mb-6">
          <CardHeader
            className={`${
              isPaid
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : isPartial
                ? "bg-gradient-to-r from-yellow-500 to-amber-600"
                : "bg-gradient-to-r from-red-500 to-rose-600"
            } text-white`}
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Verified Successfully</CardTitle>
                  <p className={isPaid ? "text-green-100" : isPartial ? "text-yellow-100" : "text-red-100"}>
                    Invoice information confirmed
                  </p>
                </div>
              </div>
              <Badge
                className={`${
                  isPaid
                    ? "bg-white text-green-700"
                    : isPartial
                    ? "bg-white text-yellow-700"
                    : "bg-white text-red-700"
                } font-bold px-3 py-1`}
              >
                {invoice.status}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Invoice Details Card */}
        <Card className="shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-600" />
                <CardTitle className="text-xl">Invoice Details</CardTitle>
              </div>
              <div className="text-sm text-gray-600">
                <Calendar className="w-4 h-4 inline mr-1" />
                {invoice.invoiceDate}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Invoice Number */}
            <div className="mb-6 pb-6 border-b">
              <div className="text-sm text-gray-600 mb-2">Invoice Number</div>
              <div className="font-mono text-2xl font-bold text-primary-700 bg-primary-50 px-4 py-2 rounded-lg inline-block">
                {invoice.invoiceNumber}
              </div>
            </div>

            {/* Customer Name */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">Customer Name</div>
              <div className="text-xl font-semibold text-gray-900">{invoice.customerName}</div>
            </div>

            {/* Payment Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-sm">৳</span>
                  <span className="text-sm font-medium">Total Amount</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{invoice.grandTotal.toLocaleString()} BDT</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Paid Amount</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{invoice.paidAmount.toLocaleString()} BDT</p>
              </div>

              {invoice.dueAmount > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Due Amount</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{invoice.dueAmount.toLocaleString()} BDT</p>
                </div>
              )}

              {invoice.paymentMethod && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm font-medium">Payment Method</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{invoice.paymentMethod}</p>
                </div>
              )}
            </div>

            {/* Verification Badge */}
            <div className="mt-6 pt-6 border-t bg-primary-50 -mx-6 px-6 py-4 rounded-b-lg">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Verified by Khalil Computer</div>
                    <div className="text-sm text-gray-600">
                      This invoice is authentic and issued by our system
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Button onClick={handleCopyInvoice} className="bg-primary-600 hover:bg-primary-700">
            Copy Invoice Details
          </Button>
          <Button onClick={() => window.print()} variant="outline">
            Print Invoice
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Khalil Computer - All rights reserved</p>
          <p className="mt-1">For inquiries, contact: support@khalilcomputer.com</p>
        </div>
      </div>
    </div>
  );
}
