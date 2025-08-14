import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Phone } from 'lucide-react'
import React from 'react'

export default function FormContactInformation({ errors, register }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                        Contact Information
                    </h3>
                    <p className="text-sm text-slate-500">
                        Phone numbers and addresses
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        id: "studentMobile",
                        label: "Student Mobile",
                        required: true,
                    },
                    {
                        id: "guardianMobile",
                        label: "Guardian Mobile",
                    },
                ].map(({ id, label, required = false }) => (
                    <div key={id} className="space-y-2">
                        <Label
                            htmlFor={id}
                            className="text-sm font-medium text-slate-700"
                        >
                            {label}{" "}
                            {required && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                            id={id}
                            type='number'
                            {...register(id)}
                            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                        {errors[id] && (
                            <p className="text-sm text-red-500">{errors[id].message}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        id: "currentAddress",
                        label: "Current Address",
                        required: true,
                    },
                    {
                        id: "permanentAddress",
                        label: "Permanent Address",
                        required: true,
                    },
                ].map(({ id, label, required = false }) => (
                    <div key={id} className="space-y-2">
                        <Label
                            htmlFor={id}
                            className="text-sm font-medium text-slate-700"
                        >
                            {label}{" "}
                            {required && <span className="text-red-500">*</span>}
                        </Label>
                        <Textarea
                            id={id}
                            rows={3}
                            {...register(id)}
                            className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                        />
                        {errors[id] && (
                            <p className="text-sm text-red-500">{errors[id].message}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
