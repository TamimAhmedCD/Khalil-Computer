"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SimpleAppSidebar } from "@/components/admin/simple-app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { DashboardLoader } from "@/components/loader/dashboarLoader";
import { SidebarProvider } from "@/components/ui/simple-sidebar";
import NotFoundPage from "../not-found";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <DashboardLoader />;
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
        <SimpleAppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <SiteHeader />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
