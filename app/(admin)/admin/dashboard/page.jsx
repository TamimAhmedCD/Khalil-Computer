import { AdminWelcomeCard } from "@/components/admin/welcome-card";
import React from "react";

// Metadata for SEO and browser tab
export const metadata = {
  title: "Admin Dashboard | Khalil Computer",
  description: "A modern and easy-to-use dashboard for administrators of Khalil Computer.",
  keywords: ["Khalil Computer", "Admin Dashboard", "Admin Panel", "Dashboard", "কোম্পিউটার অ্যাডমিন"],
  robots: "noindex, nofollow", // Optional: block indexing if it's private
};

export default function AdminDashboard() {
  return <div className="m-6"><AdminWelcomeCard /></div>;
}
