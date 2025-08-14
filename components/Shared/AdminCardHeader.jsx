import React from 'react'
import { CardDescription, CardTitle } from '../ui/card'

export default function AdminCardHeader({ title, description }) {
    return (
        <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </div>
    )
}
