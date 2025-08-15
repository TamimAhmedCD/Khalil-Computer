'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react'
import AddStudent from '../../../add-student/page';

const fetchStudent = async (id) => {
    const res = await axios.get(`/api/admin/students/${id}`);
    return res.data;
};
export default function EditStudentPage() {
    const params = useParams();
    const studentId = params.id;

    const {
        data: student,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["student", studentId],
        queryFn: () => fetchStudent(studentId),
        enabled: !!studentId,
    });
    console.log(student);
    return (
        <AddStudent student={student} />
    )
}
