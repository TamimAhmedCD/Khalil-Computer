"use client";
import { Marquee } from "../magicui/marquee";
const NotificationBanner = ({
    message = "🚧 আমাদের ওয়েবসাইটের কাজ চলছে 🚧 আমরা খুব শিগগিরই সম্পূর্ণ নতুন রূপে ফিরে আসছি আরও উন্নত সেবা ও অভিজ্ঞতা নিয়ে। এই সময়ে যদি আপনার কোনও প্রশ্ন বা সহায়তা প্রয়োজন হয়, আমাদের সাথে যোগাযোগ করুন। 📞 ফোন: 01715-409109 📧 ইমেইল: info@khalilcomputer.com | ধন্যবাদ, আমাদের সাথে থাকার জন্য।",
    variant = "warning",
}) => {
    // Determine variant classes
    const variantClasses = {
        default: "bg-background text-foreground",
        warning:
            "bg-primary-100 dark:bg-yellow-900/30 text-primary-900 dark:text-yellow-100",
        destructive: "bg-destructive/15 text-destructive dark:bg-destructive/30",
    };

    return (
        <div
            className={`w-full ${variantClasses[variant] || variantClasses.default} py-2.5 px-5 flex items-center justify-between z-50 shadow-sm border-b`}
        >
            <div className="overflow-hidden w-[calc(100%-40px)] relative">
                <Marquee pauseOnHover>{message}</Marquee>
            </div>
        </div>
    );
};

export default NotificationBanner;
