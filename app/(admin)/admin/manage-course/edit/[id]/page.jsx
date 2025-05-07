'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React from 'react'

const fetchCourse = async (id) => {
    const res = await axios.get(`/api/admin/courses.${id}`)
    return res.data
}

export default function EditCoursePage() {
    const params = useParams()
    const id = params.id
    return (
        <div>page {id}</div>
    )
}
