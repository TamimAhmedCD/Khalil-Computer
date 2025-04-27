import { Hind_Siliguri, Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Shared/Navbar";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Khalil Computer",
  description:
    "Khalil Computer is a premier training center offering specialized courses in graphic design, freelancing web design, and digital marketing. Our expert instructors provide hands-on training to equip students with the skills needed to succeed in the tech industry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${hindSiliguri.variable} ${montserrat}  antialiased font-hind-siliguri`}
      >
        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          <Navbar />
        </div>

        <Separator className="w-full" />

        <div className="container mx-auto px-5 md:px-10 lg:px-20">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
