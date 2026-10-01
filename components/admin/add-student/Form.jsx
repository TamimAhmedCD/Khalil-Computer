"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { GraduationCap, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import FormPersonalInformation from "./FormPersonalInformation";
import FormFamilyInformation from "./FormFamilyInformation";
import FormContactInformation from "./FormContactInformation";
import FormAcademicInformation from "./FormAcademicInformation";
import FormPaymentInformation from "./FormPaymentInformation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ImageCropModal from "./ImageCropModal";

// Zod validation schema
const studentSchema = z.object({
    studentName: z.string().min(1, "Student name is required"),
    batchNumber: z.string().min(1, "Batch number is required"),
    idNumber: z.string().min(1, "ID number is required"),
    duration: z.string().min(1, "Duration is required"),
    fatherName: z.string().min(1, "Father's name is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    studentMobile: z.string().min(11, "Mobile number is required"),
    guardianMobile: z.string().optional(),
    birthDate: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    bloodGroup: z.string().optional(),
    maritalStatus: z.string().optional(),
    education: z.string().min(1, "Education is required"),
    occupation: z.string().optional(),
    course: z.string().min(1, "Course is required"),
    currentAddress: z.string().min(1, "Current address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    studentImage: z.any().optional(),
    courseFee: z.string().min(1, "Course fee is required"),
    amountPaid: z.string().min(1, "Amount paid is required"),
    outstandingAmount: z.string().min(1, "Outstanding amount is required"),
    comments: z.string().optional(),
    certificate_issued: z.string().optional(),
});

export default function StudentForm({ student }) {
    const [imagePreview, setImagePreview] = useState(
        student?.studentImage || null
    );
    const [imageFile, setImageFile] = useState(null);
    const [oldImageUrl, setOldImageUrl] = useState(student?.studentImage || null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            studentName: student?.studentName || "",
            batchNumber: student?.batchNumber || "",
            idNumber: student?.idNumber || "",
            duration: student?.duration || "",
            fatherName: student?.fatherName || "",
            motherName: student?.motherName || "",
            email: student?.email || "",
            studentMobile: student?.studentMobile || "",
            guardianMobile: student?.guardianMobile || "",
            birthDate: student?.birthDate || "",
            gender: student?.gender || "",
            bloodGroup: student?.bloodGroup || "",
            maritalStatus: student?.maritalStatus || "",
            education: student?.education || "",
            occupation: student?.occupation || "",
            course: student?.course || "",
            currentAddress: student?.currentAddress || "",
            permanentAddress: student?.permanentAddress || "",
            studentImage: student?.studentImage || "",
            courseFee: student?.courseFee || 0,
            amountPaid: student?.amountPaid || 0,
            outstandingAmount: student?.outstandingAmount || 0,
            comments: student?.comments || "",
            certificate_issued: student?.certificate_issued || "",
        },
    });

    useEffect(() => {
        if (student) {
            Object.keys(student).forEach((key) =>
                setValue(key, student[key])
            );
            setImagePreview(student.studentImage || null);
            setOldImageUrl(student.studentImage || null);
        }
    }, [student, setValue]);

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target.result);
                setCropModalOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedFile, previewUrl) => {
        setImageFile(croppedFile);
        setImagePreview(previewUrl);
        setValue("studentImage", croppedFile);
        setSelectedFile(null);
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setValue("studentImage", null);
    };

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();

            // Track if we're uploading a new image
            let hasNewImage = false;

            // Add all fields to FormData
            Object.keys(data).forEach((key) => {
                if (key === "studentImage" && data[key] instanceof File) {
                    formData.append(key, data[key]); // Send File object directly for Cloudinary
                    hasNewImage = true;
                } else if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });

            // Add _id for updates
            if (student?._id) {
                formData.append("_id", student._id);
                // Send old image URL so backend can delete it
                // Always send for updates - backend decides if it needs deletion
                if (oldImageUrl && oldImageUrl.includes("cloudinary")) {
                    formData.append("oldImageUrl", oldImageUrl);
                    console.log("Sending oldImageUrl for deletion:", oldImageUrl);
                }
            }

            // Debug: Log what's being sent
            console.log("FormData contents:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ', pair[1]);
            }
            await submitData(formData);
        } catch (err) {
            console.error(err);
            toast.error("Error: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const submitData = async (formData) => {
        const res = await axios.post("/api/admin/students", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
            toast.success(
                student
                    ? "Student updated successfully!"
                    : "Student added successfully!"
            );
            router.push("/admin/manage-students");
        } else {
            toast.error(res.data.error || "Failed to save student");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormPersonalInformation
                    register={register}
                    errors={errors}
                    imagePreview={imagePreview}
                    handleImageUpload={handleImageUpload}
                    removeImage={removeImage}
                    setValue={setValue}
                    watch={watch}
                />
                <Separator className="bg-slate-200" />
                <FormFamilyInformation register={register} errors={errors} />
                <Separator className="bg-slate-200" />
                <FormContactInformation register={register} errors={errors} />
                <Separator className="bg-slate-200" />
                <FormAcademicInformation
                    watch={watch}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                />
                <Separator className="bg-slate-200" />
                <FormPaymentInformation register={register} errors={errors} setValue={setValue} />
                <div className="flex justify-end pt-6">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-primary-700 hover:bg-primary-600 text-white px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                {student ? "Updating..." : "Registering..."}
                            </>
                        ) : (
                            <>
                                <GraduationCap className="w-5 h-5 mr-2" />
                                {student ? "Update Student" : "Register Student"}
                            </>
                        )}
                    </Button>
                </div>
            </form>

            <ImageCropModal
                open={cropModalOpen}
                onClose={() => setCropModalOpen(false)}
                imageSrc={selectedFile}
                onCropComplete={handleCropComplete}
            />
        </>
    );
}
