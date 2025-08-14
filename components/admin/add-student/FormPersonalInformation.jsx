import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, User, X } from "lucide-react";


export default function FormPersonalInformation({ imagePreview, removeImage, handleImageUpload, register, errors, setValue }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                        Personal Information
                    </h3>
                    <p className="text-sm text-slate-500">
                        Basic details about the student
                    </p>
                </div>
            </div>

            {/* Student Image Upload Section */}
            <div className="space-y-4">
                <Label className="text-sm font-medium text-slate-700">
                    Student Photo
                </Label>
                <div className="flex items-start gap-6">
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Student preview"
                                    className="w-24 h-24 rounded-lg object-cover border-2 border-slate-200"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                                    onClick={removeImage}
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50">
                                <User className="w-8 h-8 text-slate-400" />
                            </div>
                        )}
                    </div>

                    {/* Upload Button */}
                    <div className="flex-1">
                        <div className="space-y-2">
                            <Label
                                htmlFor="studentImage"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                Choose Photo
                            </Label>
                            <Input
                                id="studentImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <p className="text-xs text-slate-500">
                                Upload a clear photo of the student. Max size: 5MB
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { id: "studentName", label: "Student Name", required: true },
                    { id: "email", label: "Email Address", type: "email" },
                    {
                        id: "birthDate",
                        label: "Date of Birth",
                        type: "date",
                        required: true,
                    },
                ].map(({ id, label, type = "text", required = false }) => (
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
                            type={type}
                            {...register(id)}
                            className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        />
                        {errors[id] && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                {errors[id].message}
                            </p>
                        )}
                    </div>
                ))}

                {/* Gender Select */}
                <div className="space-y-2">
                    <Label
                        htmlFor="gender"
                        className="text-sm font-medium text-slate-700"
                    >
                        Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(val) => setValue("gender", val)}>
                        <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && (
                        <p className="text-sm text-red-500">
                            {errors.gender.message}
                        </p>
                    )}
                </div>

                {/* Blood Group Select */}
                <div className="space-y-2">
                    <Label
                        htmlFor="bloodGroup"
                        className="text-sm font-medium text-slate-700"
                    >
                        Blood Group
                    </Label>
                    <Select onValueChange={(val) => setValue("bloodGroup", val)}>
                        <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                            <SelectValue placeholder="Select Blood Group" />
                        </SelectTrigger>
                        <SelectContent>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                                (bg) => (
                                    <SelectItem key={bg} value={bg}>
                                        {bg}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>

                {/* Marital Status Select */}
                <div className="space-y-2">
                    <Label
                        htmlFor="maritalStatus"
                        className="text-sm font-medium text-slate-700"
                    >
                        Marital Status
                    </Label>
                    <Select onValueChange={(val) => setValue("maritalStatus", val)}>
                        <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                            <SelectValue placeholder="Select Marital Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
