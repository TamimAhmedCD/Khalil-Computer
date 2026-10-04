"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../ui/sidebar"
import Image from "next/image"

export function AdminSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Image
                    src="/icon.svg"
                    width={130}
                    height={160}
                    alt="Khalil Computer Logo"
                    title="Khalil Computer"
                    priority
                    className="w-32 lg:w-36 h-auto"
                />
            </SidebarHeader>
            <SidebarContent>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
