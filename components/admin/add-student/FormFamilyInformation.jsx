import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Users } from 'lucide-react'
import React from 'react'

export default function FormFamilyInformation({ errors, register }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                        Family Information
                    </h3>
                    <p className="text-sm text-slate-500">
                        Parent and guardian details
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { id: "fatherName", label: "Father's Name", required: true },
                    { id: "motherName", label: "Mother's Name", required: true },
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
                            {...register(id)}
                            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
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
