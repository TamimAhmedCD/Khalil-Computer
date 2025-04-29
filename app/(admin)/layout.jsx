'use client'

import { useSession } from "next-auth/react"

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession()
  console.log(session);


  if (status === 'loading') {
    return <div>লোড হচ্ছে...</div>
  }

  if (session?.user?.role === 'admin') {
    return <div>{children}</div>
  }

  return null
}
