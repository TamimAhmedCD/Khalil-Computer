"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { DashboardLoader } from "@/components/loader/dashboarLoader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
            {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
