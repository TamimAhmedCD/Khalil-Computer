"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import FormPersonalInformation from "./FormPersonalInformation";
import FormFamilyInformation from "./FormFamilyInformation";
import FormContactInformation from "./FormContactInformation";
import FormAcademicInformation from "./FormAcademicInformation";
import FormPaymentInformation from "./FormPaymentInformation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
});

export default function StudentForm({ student }) {
    const [imagePreview, setImagePreview] = useState(
        student?.studentImage || null
    );
    const [imageFile, setImageFile] = useState(null);
    const router = useRouter()

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
        },
    });

    useEffect(() => {
        if (student) {
            Object.keys(student).forEach((key) =>
                setValue(key, student[key])
            );
            setImagePreview(student.studentImage || null);
        }
    }, [student, setValue]);

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size should be less than 5MB");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                setValue("studentImage", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setValue("studentImage", null);
    };

    const onSubmit = async (data) => {
        try {
            // Convert File object to base64 if present
            if (data.studentImage && data.studentImage instanceof File) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64Image = reader.result;
                    await submitData({ ...data, studentImage: base64Image });
                };
                reader.readAsDataURL(data.studentImage);
            } else {
                await submitData(data);
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        }
    };

    const submitData = async (payload) => {
        const res = await axios.post("/api/admin/students", {
            ...payload,
            _id: student?._id,
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
                    className="bg-primary-700 hover:bg-primary-600 text-white px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    {student ? "Update Student" : "Register Student"}
                </Button>
            </div>
        </form>
    );
}
