import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GraduationCap } from 'lucide-react'
import React from 'react'

export default function FormAcademicInformation({ errors, register, setValue, watch }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                        Academic Information
                    </h3>
                    <p className="text-sm text-slate-500">
                        Education and course details
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label
                        htmlFor="education"
                        className="text-sm font-medium text-slate-700"
                    >
                        Education <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="education"
                        {...register("education")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {errors.education && (
                        <p className="text-sm text-red-500">
                            {errors.education.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="occupation"
                        className="text-sm font-medium text-slate-700"
                    >
                        Occupation
                    </Label>
                    <Input
                        id="occupation"
                        {...register("occupation")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                </div>
                {/* Course Select */}
                <div className="space-y-2">
                    <Label
                        htmlFor="course"
                        className="text-sm font-medium text-slate-700"
                    >
                        Course <span className="text-red-500">*</span>
                    </Label>
                    <Select value={watch("course")} onValueChange={(val) => setValue("course", val)}>
                        <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                            <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                            {[
                                "Graphics Design",
                                "Basic Computer",
                                "Web Design",
                                "Digital Marketing",
                            ].map((course) => (
                                <SelectItem key={course} value={course}>
                                    {course}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.course && (
                        <p className="text-sm text-red-500">
                            {errors.course.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label
                        htmlFor="batchNumber"
                        className="text-sm font-medium text-slate-700"
                    >
                        Batch Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="batchNumber"
                        {...register("batchNumber")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {errors.batchNumber && (
                        <p className="text-sm text-red-500">
                            {errors.batchNumber.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="idNumber"
                        className="text-sm font-medium text-slate-700"
                    >
                        ID Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="idNumber"
                        {...register("idNumber")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {errors.idNumber && (
                        <p className="text-sm text-red-500">
                            {errors.idNumber.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="duration"
                        className="text-sm font-medium text-slate-700"
                    >
                        Duration <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="duration"
                        {...register("duration")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {errors.duration && (
                        <p className="text-sm text-red-500">
                            {errors.duration.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label
                        htmlFor="certificate_issued"
                        className="text-sm font-medium text-slate-700"
                    >
                        Certificate Issued
                    </Label>
                    <Input
                        type={'date'}
                        id="certificate_issued"
                        {...register("certificate_issued")}
                        className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {errors.certificate_issued && (
                        <p className="text-sm text-red-500">
                            {errors.certificate_issued.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
