import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import { Hind_Siliguri, Montserrat } from "next/font/google";
export const metadata = {
    title: "Dashboard | Khalil Computer",
    description: "Admin and Student dashboard panel for Khalil Computer."
};

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
    variable: "--font-hind-siliguri",
    subsets: ["bengali"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${montserrat} ${hindSiliguri}`} cz-shortcut-listen="true">
                <div className="min-h-screen bg-gray-100 p-4">
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
