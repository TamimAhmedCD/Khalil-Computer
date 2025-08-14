"use client";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import Form from "@/components/admin/add-student/Form";

export default function AddStudent({ editingStudent }) {


    return (
        <Card className="m-6 md:m-8">
            <CardHeader className="border-b">
                <AdminCardHeader
                    title={editingStudent ? "Edit Student" : "Student Registration"}
                    description={editingStudent
                        ? "Update student information below"
                        : "Complete the form below to register a new student"}
                />
            </CardHeader>

            <CardContent className="space-y-8">
                <Form editingStudent={editingStudent} />
            </CardContent>
        </Card>
    );
}
