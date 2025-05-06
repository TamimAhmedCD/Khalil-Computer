"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Admission } from "../Admission/admission";

const navItems = [
  {
    title: "সকল কোর্স",
    href: "/courses",
  },
  {
    title: "ব্লগ",
    href: "/blog",
  },
  {
    title: "কমিউনিটি",
    href: "#",
    items: [
      { title: "ফেসবুক গ্রুপ", href: "/" },
      { title: "ইউটিউব", href: "/" },
    ],
  },
  {
    title: "আরো",
    href: "#",
    items: [
      { title: "যোগাযোগ", href: "/contact-us" },
      { title: "আমাদের সম্পর্কে", href: "/about" },
    ],
  },
];

const NavItem = ({ title, href, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors",
          open && "text-primary-600"
        )}
      >
        <span className="relative">
          {title}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-4/5 transition-all duration-300"></span>
        </span>
        {items && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        )}
      </Link>

      {items && open && (
        <div className="absolute left-0 top-full z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-md animate-in fade-in-10 zoom-in-95">
          <div className="grid">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex select-none items-center rounded-sm px-3 py-2 text-sm hover:bg-gray-100"
              >
                <span className="relative">
                  {item.title}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-4/5 transition-all duration-300"></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({ title, href, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 py-2">
      {items ? (
        <>
          <button
            className="group flex w-full items-center justify-between py-2 text-left text-base font-medium"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="relative">
              {title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-4/5 transition-all duration-300"></span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </button>
          {isOpen && (
            <div className="ml-4 mt-2 space-y-2">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block py-1.5 text-sm text-gray-600 hover:text-primary-600"
                >
                  <span className="relative">
                    {item.title}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-4/5 transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={href}
          className="group block py-2 text-base font-medium hover:text-primary-600"
        >
          <span className="relative">
            {title}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-4/5 transition-all duration-300"></span>
          </span>
        </Link>
      )}
    </div>
  );
};


const Navbar = () => {
  const { data: session, status } = useSession()
  return (
    <nav className="py-6">
      <div className="flex justify-between gap-5 items-center">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              width={130}
              height={160}
              alt="Khalil Computer Logo"
              title="Khalil Computer"
              priority
              className="w-32 lg:w-36 h-auto"
            />
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem key={item.title} {...item} />
            ))}
          </div>

          {/* <div>

            {status === "loading" ? null : session?.user?.role === "admin" ? (
              <Link href="/admin/dashboard">
                <button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 flex items-center gap-2 group py-2 px-4 rounded-md text-white">ড্যাশবোর্ড</button>
              </Link>
            ) : session?.user?.role === "student" ? (
              <Link href="/student/dashboard">
                <button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 flex items-center gap-2 group py-2 px-4 rounded-md text-white">ড্যাশবোর্ড</button>
              </Link>
            ) : (
              <Link href="/auth">
                <button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 flex items-center gap-2 group py-2 px-4 rounded-md text-white">লগইন</button>
              </Link>
            )}

          </div> */}
          <Admission triggerElements={<span className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 flex items-center gap-2 group py-2 px-4 rounded-md text-white">ভর্তি হোন</span>} />
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="px-8 py-8">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      width={100}
                      height={100}
                      alt="Khalil Computer Logo"
                      title="Khalil Computer Logo"
                    />
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  {navItems.map((item) => (
                    <MobileNavItem key={item.title} {...item} />
                  ))}
                </div>
                <div className="border-t pt-4">

                  {status === "loading" ? null : session?.user?.role === "admin" ? (
                    <Link href="/admin/dashboard">
                      <button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 w-full text-center gap-2 group py-2 px-4 rounded-md text-white">ড্যাশবোর্ড</button>
                    </Link>
                  ) : session?.user?.role === "student" ? (
                    <Link href="/student/dashboard">
                      <button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 w-full text-center gap-2 group py-2 px-4 rounded-md text-white">ড্যাশবোর্ড</button>
                    </Link>
                  ) : (
                    <Link href="/auth">
                      <button className="bg-primary-600 hover:bg-transparent border border-primary-600 hover:text-primary-600 cursor-pointer transition-all duration-600 text-center gap-2 group py-2 px-4 rounded-md text-white w-full">লগইন</button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
