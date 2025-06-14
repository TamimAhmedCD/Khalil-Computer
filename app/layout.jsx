import { Toaster } from "@/components/ui/sonner";
import { Hind_Siliguri, Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Providers from "@/provider/tenStackProvider";

export const metadata = {
    title: {
        template: '%s | Khalil Computer',
        default: 'Khalil Computer', // a default is required when creating a template
    },
    description:
        "খলিল কম্পিউটার বাংলাদেশের অন্যতম সেরা প্রশিক্ষণ প্রতিষ্ঠান, যেখানে আপনি গ্রাফিক ডিজাইন, ওয়েব ডিজাইন, ফ্রিল্যান্সিং এবং ডিজিটাল মার্কেটিং এর উপর হাতে-কলমে প্রশিক্ষণ নিতে পারবেন। দক্ষ প্রশিক্ষকদের মাধ্যমে আপনার ক্যারিয়ার গড়ে তুলুন।",
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



export default function RootLayout({ children }) {
    return (
        <html lang="bn">
            <body
                className={` no-scroll ${hindSiliguri.variable} ${montserrat.variable}  antialiased font-hind-siliguri scroll-smooth`} cz-shortcut-listen="true"
            >
                <Providers><SessionProvider>{children}</SessionProvider></Providers>

                <Toaster />
            </body>
        </html>
    );
}
