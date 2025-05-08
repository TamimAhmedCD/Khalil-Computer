import { cn } from "@/lib/utils";
import { Marquee } from "../magicui/marquee";

const reviews = [
    {
        name: "রহমান আহমেদ",
        username: "ওয়েব ডেভেলপমেন্ট কোর্স",
        body: "খলিল কম্পিউটার থেকে ওয়েব ডেভেলপমেন্ট কোর্সটি শিখে আমি এখন ফ্রিল্যান্সিং করছি। কোর্সের বিষয়বস্তু খুবই সহজ ও বিস্তারিত ছিল।",
        img: "https://avatar.vercel.sh/rahman",
    },
    {
        name: "মিনা রহমান",
        username: "গ্রাফিক ডিজাইন কোর্স",
        body: "গ্রাফিক ডিজাইন কোর্সটি শুরু থেকে শেষ পর্যন্ত খুবই চমৎকার ছিল। আমি এখন গ্রাফিক ডিজাইনার হিসেবে কাজ শুরু করেছি।",
        img: "https://avatar.vercel.sh/mina",
    },
    {
        name: "সোহেল মিয়া",
        username: "সফটওয়্যার ডেভেলপমেন্ট কোর্স",
        body: "খলিল কম্পিউটারের কোর্সটি আমাকে নতুন প্রযুক্তির সাথে পরিচিত করিয়েছে। আমি আজ ভালো মানের সফটওয়্যার ডেভেলপার হতে পেরেছি।",
        img: "https://avatar.vercel.sh/sohel",
    },
    {
        name: "নুসরাত জাহান",
        username: "ফ্রিল্যান্সিং গাইডেন্স কোর্স",
        body: "ফ্রিল্যান্সিং কোর্সটি আমাকে সঠিক দিশা দেখিয়েছে। আমি এখন ক্লায়েন্টদের সাথে কাজ করছি এবং আয়ও বাড়িয়েছে।",
        img: "https://avatar.vercel.sh/nusrat",
    },
    {
        name: "সাইফুল ইসলাম",
        username: "মাইক্রোসফট অফিস কোর্স",
        body: "আমি আগে কখনো কম্পিউটার চালাইনি। এখানে শেখার পরিবেশ এত সহজ যে আমি এখন confidently অফিস অ্যাপ্লিকেশন ব্যবহার করতে পারি।",
        img: "https://avatar.vercel.sh/saiful",
    },
    {
        name: "আফরিন আক্তার",
        username: "ডিজিটাল মার্কেটিং কোর্স",
        body: "ডিজিটাল মার্কেটিং শেখার পর আমি নিজের ছোট বিজনেসকে অনলাইনে গ্রো করাতে পেরেছি। ধন্যবাদ খলিল কম্পিউটারকে!",
        img: "https://avatar.vercel.sh/afrin",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function Testimonial() {
    return (
        <>
            {" "}
            {/* Heading */}
            <div className="text-center lg:w-2/4 mx-auto mt-5 md:mt-10 mb-3">
                <h1 className="font-hind-siliguri font-bold text-3xl md:text-4xl mb-3 text-gray-800">
                    শিক্ষার্থীদের <span className="text-primary-600">অভিজ্ঞতা</span>
                </h1>
                <p className="text-gray-600">
                    আমাদের প্রশিক্ষণ শেষে শিক্ষার্থীরা কেমন অভিজ্ঞতা অর্জন করেছে, তাদের কিছু বাস্তব মতামত এখানে তুলে ধরা হলো।
                </p>
            </div>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
        </>
    );
}
