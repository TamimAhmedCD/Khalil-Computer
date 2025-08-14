import { useParams } from 'next/navigation'
import React from 'react'

export default function StudentDetails() {
    const params = useParams()
    const id = params.id;

    return (
        <div>page</div>
    )
}
