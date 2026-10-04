"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Book, Megaphone, Users } from "lucide-react";
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

export function SimpleAppSidebarMobile() {
  const { data: session } = useSession();

  return (
    <aside className="flex flex-col h-full bg-white border-r">
      {/* Header */}
      <div className="p-4 border-b">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
        >
          <Image
            src="/icon.svg"
            alt="Khalil Computer Icon"
            width={32}
            height={32}
            priority
            className="object-contain size-8 flex-shrink-0"
          />
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-primary-600 text-sm">
              খলিল কম্পিউটার
            </span>
            <span className="text-xs text-primary-500">অ্যাডমিন</span>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2">
        <SimpleNavMain items={navData} />
      </div>

      {/* Footer */}
      <div className="p-2 border-t">
        <SimpleNavUser user={session?.user} />
      </div>
    </aside>
  );
}
