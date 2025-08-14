'use client'
import React, { useState } from 'react'
import { z } from 'zod';
import {
    Users,
    GraduationCap,
    Phone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormPersonalInformation from './FormPersonalInformation';
import FormFamilyInformation from './FormFamilyInformation';
import FormContactInformation from './FormContactInformation';
import FormAcademicInformation from './FormAcademicInformation';

// ✅ Zod schema for validation
const studentSchema = z.object({
    studentName: z.string().min(1, "Student name is required"),
    batchNumber: z.string().min(3, "Batch Number is required"),
    idNumber: z.string().min(5, "ID Number is required"),
    duration: z.string().min(5, "Duration is required"),
    fatherName: z.string().min(1, "Father's name is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    studentMobile: z.string().min(11, "Mobile number is required"),
    guardianMobile: z.string().min(11, "Guardian mobile number invalid").optional(),
    birthDate: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    bloodGroup: z.string().optional(),
    maritalStatus: z.string().optional(),
    education: z.string().min(1, "Education is required"),
    occupation: z.string().optional(),
    course: z.string().min(1, "Course is required"),
    currentAddress: z.string().min(1, "Current address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    studentImage: z.string().optional(),
});

export default function Form({ editingStudent }) {
    const [imagePreview, setImagePreview] = useState(
        editingStudent?.studentImage || null
    );
    const [imageFile, setImageFile] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            studentName: editingStudent?.studentName || "",
            fatherName: editingStudent?.fatherName || "",
            motherName: editingStudent?.motherName || "",
            email: editingStudent?.email || "",
            studentMobile: editingStudent?.studentMobile || "",
            guardianMobile: editingStudent?.guardianMobile || "",
            birthDate: editingStudent?.birthDate || "",
            gender: editingStudent?.gender || "",
            bloodGroup: editingStudent?.bloodGroup || "",
            maritalStatus: editingStudent?.maritalStatus || "",
            education: editingStudent?.education || "",
            occupation: editingStudent?.occupation || "",
            course: editingStudent?.course || "",
            currentAddress: editingStudent?.currentAddress || "",
            permanentAddress: editingStudent?.permanentAddress || "",
            studentImage: editingStudent?.studentImage || "",
        },
    });

    useEffect(() => {
        if (editingStudent) {
            setValue("studentName", editingStudent.studentName);
            setValue("fatherName", editingStudent.fatherName);
            setValue("motherName", editingStudent.motherName);
            setValue("email", editingStudent.email);
            setValue("studentMobile", editingStudent.studentMobile);
            setValue("guardianMobile", editingStudent.guardianMobile);
            setValue("birthDate", editingStudent.birthDate);
            setValue("gender", editingStudent.gender);
            setValue("bloodGroup", editingStudent.bloodGroup);
            setValue("maritalStatus", editingStudent.maritalStatus);
            setValue("education", editingStudent.education);
            setValue("occupation", editingStudent.occupation);
            setValue("course", editingStudent.course);
            setValue("currentAddress", editingStudent.currentAddress);
            setValue("permanentAddress", editingStudent.permanentAddress);
            setValue("studentImage", editingStudent.studentImage);
            setImagePreview(editingStudent.studentImage);
            setValue('batchNumber', editingStudent.batchNumber),
                setValue('idNumber', editingStudent.idNumber),
                setValue('duration', editingStudent.duration)
        }
    }, [editingStudent, setValue]);

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
                const result = e.target?.result;
                setImagePreview(result);
                setValue("studentImage", result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        setValue("studentImage", "");
    };

    const onSubmit = (data) => {
        if (editingStudent) {
            console.log("Updating student:", { ...data, id: editingStudent.id });
            alert("Student updated successfully!");
        } else {
            console.log("Creating new student:", data);
            alert("Student registered successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <FormPersonalInformation register={register} errors={errors} imagePreview={imagePreview} removeImage={removeImage} handleImageUpload={handleImageUpload} setValue={setValue} />
            <Separator className="bg-slate-200" />

            {/* Family Information Section */}
            <FormFamilyInformation errors={errors} register={register} />

            <Separator className="bg-slate-200" />

            {/* Contact Information Section */}
            <FormContactInformation errors={errors} register={register} />
            <Separator className="bg-slate-200" />

            {/* Academic Information Section */}
            <FormAcademicInformation errors={errors} register={register} setValue={setValue} />

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
                <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    {editingStudent ? "Update Student" : "Register Student"}
                </Button>
            </div>
        </form>
    )
}
