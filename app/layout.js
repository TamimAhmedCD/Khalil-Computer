import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata = {
  title: "Khalil Computer",
  description: "Khalil Computer is a premier training center offering specialized courses in graphic design, freelancing web design, and digital marketing. Our expert instructors provide hands-on training to equip students with the skills needed to succeed in the tech industry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} antialiased`}
      >
        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
