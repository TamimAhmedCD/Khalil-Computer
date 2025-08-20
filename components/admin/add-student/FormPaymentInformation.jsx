import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard } from 'lucide-react'
import React from 'react'

export default function FormPaymentInformation({ errors, register, setValue }) {
    // Handle calculation directly inside input change
    const handleCalculation = (field, value) => {
        const fee = Number(document.getElementById("courseFee")?.value || 0)
        let paid = Number(document.getElementById("amountPaid")?.value || 0)

        if (field === "amountPaid") {
            // Prevent paid > course fee
            if (Number(value) > fee) {
                paid = fee
            } else {
                paid = Number(value)
            }
        }

        // Update the changed field
        setValue(field, field === "amountPaid" ? paid : Number(value))

        // Calculate remaining amount
        const remaining = fee - paid
        setValue("outstandingAmount", remaining >= 0 ? remaining : 0)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                        Payment Information
                    </h3>
                    <p className="text-sm text-slate-500">
                        Course fee, payment, and additional notes
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Fee */}
                <div className="space-y-2">
                    <Label htmlFor="courseFee" className="text-sm font-medium text-slate-700">
                        Course Fee <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="courseFee"
                        type="number"
                        {...register("courseFee")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        placeholder="Enter course fee"
                        onChange={(e) => handleCalculation("courseFee", e.target.value)}
                    />
                    {errors.courseFee && (
                        <p className="text-sm text-red-500">{errors.courseFee.message}</p>
                    )}
                </div>

                {/* Amount Paid */}
                <div className="space-y-2">
                    <Label htmlFor="amountPaid" className="text-sm font-medium text-slate-700">
                        Amount Paid <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="amountPaid"
                        type="number"
                        {...register("amountPaid")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        placeholder="Enter amount paid"
                        onChange={(e) => handleCalculation("amountPaid", e.target.value)}
                    />
                    {errors.amountPaid && (
                        <p className="text-sm text-red-500">{errors.amountPaid.message}</p>
                    )}
                </div>

                {/* Outstanding Amount */}
                <div className="space-y-2">
                    <Label htmlFor="outstandingAmount" className="text-sm font-medium text-slate-700">
                        Outstanding Amount
                    </Label>
                    <Input
                        id="outstandingAmount"
                        type="number"
                        {...register("outstandingAmount")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        placeholder="Remaining amount"
                        readOnly
                    />
                </div>

                {/* Comments */}
                <div className="space-y-2">
                    <Label htmlFor="comments" className="text-sm font-medium text-slate-700">
                        Comments
                    </Label>
                    <Input
                        id="comments"
                        {...register("comments")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        placeholder="Any additional notes"
                    />
                    {errors.comments && (
                        <p className="text-sm text-red-500">{errors.comments.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
