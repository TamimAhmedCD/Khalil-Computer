"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Book, Megaphone, Users } from "lucide-react";
import {
  SimpleSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/simple-sidebar";
import { SimpleNavMain } from "./simple-nav-main";
import { SimpleNavUser } from "./simple-nav-user";

const navData = [
  {
    title: "Course Management",
    url: "#",
    icon: Book,
    items: [
      {
        title: "Add Course",
        url: "/admin/add-course",
      },
      {
        title: "Manage Course",
        url: "/admin/manage-course",
      },
    ],
  },
  {
    title: "Student Management",
    url: "/admin/students",
    icon: Users,
    items: [
      {
        title: "Add Student",
        url: "/admin/add-student",
      },
      {
        title: "Manage Students",
        url: "/admin/manage-students",
      },
    ],
  },
  {
    title: "Notice Board",
    url: "/admin/noticeboard",
    icon: Megaphone,
    items: [
      {
        title: "Add Notice",
        url: "/admin/add-notice",
      },
      {
        title: "Manage Notice",
        url: "/admin/manage-notice",
      },
    ],
  },
];

export function SimpleAppSidebar() {
  const { data: session } = useSession();
  const { isCollapsed } = useSidebar();

  return (
    <SimpleSidebar>
      <SidebarHeader>
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
        >
          <Image
            src="/icon2.svg"
            alt="Khalil Computer Icon"
            width={32}
            height={32}
            priority
            className="object-contain size-8 flex-shrink-0"
          />
          {!isCollapsed && (
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold text-primary-600 text-sm">
                খলিল কম্পিউটার
              </span>
              <span className="text-xs text-primary-500">অ্যাডমিন</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SimpleNavMain items={navData} />
      </SidebarContent>

      <SidebarFooter>
        <SimpleNavUser user={session?.user} />
      </SidebarFooter>
    </SimpleSidebar>
  );
}
