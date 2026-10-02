"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SimpleAppSidebar } from "@/components/admin/simple-app-sidebar";
import { SimpleAppSidebarMobile } from "@/components/admin/simple-app-sidebar-mobile";
import { SiteHeader } from "@/components/admin/site-header";
import { SidebarProvider } from "@/components/ui/simple-sidebar";
import NotFoundPage from "../not-found";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <NotFoundPage />
    );
  }

  if (session.user.role !== "admin") {
    return (
      router.push("/unauthorized")
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop Sidebar */}
        <SimpleAppSidebar />

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* Mobile Sidebar */}
        <div className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <SimpleAppSidebarMobile />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <SiteHeader onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
