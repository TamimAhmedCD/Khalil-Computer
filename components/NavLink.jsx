// components/NavLink.jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, children, activeClass = '', inactiveClass = '', exact = false }) {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname.startsWith(href)

    const className = isActive ? activeClass : inactiveClass

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
}
