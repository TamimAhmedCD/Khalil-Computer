'use client'

import Image from "next/image";
import { Award, Users, BookOpen, Target, Heart, TrendingUp, CheckCircle, Clock, Globe, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutPage = () => {
    const stats = [
        { icon: Users, value: "২৫+", label: "বছরের অভিজ্ঞতা" },
        { icon: BookOpen, value: "৫০০০+", label: "সফল শিক্ষার্থী" },
        { icon: Award, value: "১৫+", label: "প্রফেশনাল কোর্স" },
        { icon: TrendingUp, value: "৯৫%", label: "সাফল্যের হার" },
    ];

    const values = [
        {
            icon: Target,
            title: "লক্ষ্য ভিত্তিক শিক্ষা",
            description: "আমরা শুধু তত্ত্ব নয়, বাস্তবভিত্তিক ও লক্ষ্যমুখী শিক্ষা প্রদান করি যা সরাসরি ক্যারিয়ারে কাজে আসে।"
        },
        {
            icon: Heart,
            title: "শিক্ষার্থী কেন্দ্রিক",
            description: "প্রতিটি শিক্ষার্থীর সাফল্যই আমাদের লক্ষ্য। আমরা ব্যক্তিগত মনোযোগ ও সহায়তা নিশ্চিত করি।"
        },
        {
            icon: CheckCircle,
            title: "মানসম্পন্ন প্রশিক্ষণ",
            description: "আন্তর্জাতিক মানের কারিকুলাম এবং অভিজ্ঞ প্রশিক্ষকদের মাধ্যমে সর্বোচ্চ মানের শিক্ষা।"
        },
        {
            icon: Globe,
            title: "গ্লোবাল স্ট্যান্ডার্ড",
            description: "বিশ্বমানের দক্ষতা অর্জনের মাধ্যমে আন্তর্জাতিক বাজারে প্রতিযোগিতায় এগিয়ে থাকুন।"
        }
    ];

    const milestones = [
        { year: "২০০০", title: "প্রতিষ্ঠা", description: "বড়লেখায় খলিল কম্পিউটার প্রতিষ্ঠা" },
        { year: "২০০৫", title: "সম্প্রসারণ", description: "১০০০+ শিক্ষার্থী সফলভাবে প্রশিক্ষণ সম্পন্ন" },
        { year: "২০১০", title: "স্বীকৃতি", description: "জাতীয় পর্যায়ে শ্রেষ্ঠ প্রশিক্ষণ কেন্দ্র" },
        { year: "২০১৫", title: "ডিজিটাল যুগ", description: "আধুনিক ডিজিটাল মার্কেটিং ও ফ্রিল্যান্সিং কোর্স চালু" },
        { year: "২০২০", title: "অনলাইন শিক্ষা", description: "হাইব্রিড লার্নিং মডেল চালু" },
        { year: "২০২৬", title: "নতুন উচ্চতা", description: "৫০০০+ সফল শিক্ষার্থী ও নতুন ক্যাম্পাস" }
    ];

    const achievements = [
        "২৫ বছরের নিরবচ্ছিন্ন সেবা",
        "৫০০০+ সফল শিক্ষার্থী",
        "৯৫% চাকরি প্রাপ্তির হার",
        "১৫+ বিশেষায়িত কোর্স",
        "অভিজ্ঞ ও দক্ষ প্রশিক্ষক টিম",
        "আন্তর্জাতিক মানের কারিকুলাম",
        "আধুনিক ল্যাব ও সুবিধা",
        "লাইফটাইম সাপোর্ট সিস্টেম"
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="absolute top-10 right-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-secondary-500 text-supporting-900 hover:bg-secondary-600">
                            <Sparkles className="w-3 h-3 mr-1" />
                            ২৫ বছরের বিশ্বস্ত প্রতিষ্ঠান
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            খলিল কম্পিউটার
                        </h1>
                        <p className="text-xl md:text-2xl mb-4 text-primary-100">
                            প্রযুক্তি শিক্ষায় বিশ্বস্ত নাম, সফলতার সাথী
                        </p>
                        <p className="text-lg text-primary-200 max-w-3xl mx-auto">
                            ২৫ বছর ধরে আমরা তরুণদের দক্ষ করে গড়ে তুলছি। বাস্তবভিত্তিক প্রশিক্ষণের মাধ্যমে
                            হাজারো শিক্ষার্থী আজ সফল ক্যারিয়ার গড়েছেন। আপনিও হতে পারেন আমাদের পরবর্তী সফল গল্প।
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 mt-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto -mt-20">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-t-secondary-500">
                                    <CardContent className="pt-6 text-center">
                                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Icon className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-primary-700 mb-1">{stat.value}</h3>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-200">
                                    আমাদের গল্প
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                                    সফলতার ২৫ বছরের যাত্রা
                                </h2>
                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        <strong className="text-primary-600">২০০০ সাল</strong> থেকে শুরু করে আজ পর্যন্ত,
                                        খলিল কম্পিউটার বাংলাদেশের তরুণদের প্রযুক্তি শিক্ষায় দক্ষ করে গড়ে তুলছে।
                                        আমরা বিশ্বাস করি শুধুমাত্র তাত্ত্বিক জ্ঞান নয়, বাস্তব দক্ষতাই ক্যারিয়ার সফলতার চাবিকাঠি।
                                    </p>
                                    <p>
                                        আমাদের প্রতিষ্ঠাতা <strong>মো: খলিল উদ্দিন </strong> এর স্বপ্ন ছিল স্থানীয় তরুণদের
                                        আন্তর্জাতিক মানের প্রশিক্ষণ দেওয়া। সেই স্বপ্ন থেকেই আজকের খলিল কম্পিউটার -
                                        যেখানে <strong className="text-secondary-600">৫০০০+ শিক্ষার্থী</strong> সফলতার সাথে
                                        তাদের ক্যারিয়ার গড়েছেন।
                                    </p>
                                    <p>
                                        গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং, ওয়েব ডেভেলপমেন্ট থেকে শুরু করে ফ্রিল্যান্সিং -
                                        প্রতিটি কোর্সে আমরা নিশ্চিত করি শিক্ষার্থীরা শুধু শেখে না, বরং <strong>করে শেখে</strong>।
                                        আমাদের প্রশিক্ষকরা শুধু শিক্ষক নন, তারা ইন্ডাস্ট্রি এক্সপার্ট যারা বাস্তব অভিজ্ঞতা শেয়ার করেন।
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-[4/3] bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl overflow-hidden shadow-2xl">
                                    {/* Placeholder for image - you'll add later */}
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        <Users className="w-32 h-32" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary-500/10 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="mb-4 bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
                                আমাদের মূল্যবোধ
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                কেন খলিল কম্পিউটার আলাদা?
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                আমরা শুধু একটি প্রশিক্ষণ কেন্দ্র নই, আমরা আপনার সফলতার সাথী
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <Card key={index} className="hover:shadow-lg transition-all border-l-4 border-l-primary-500 hover:border-l-secondary-500">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-6 h-6 text-primary-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                                                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-50/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-200">
                                <Clock className="w-3 h-3 mr-1" />
                                আমাদের যাত্রা
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                ২৫ বছরের মাইলস্টোন
                            </h2>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-secondary-300 to-primary-200"></div>

                            <div className="space-y-12">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <Card className="hover:shadow-lg transition-shadow">
                                                <CardContent className="pt-6">
                                                    <Badge className="mb-2 bg-secondary-500 text-supporting-900">
                                                        {milestone.year}
                                                    </Badge>
                                                    <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                                                    <p className="text-muted-foreground">{milestone.description}</p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div className="hidden md:block w-4 h-4 bg-secondary-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                                        <div className="flex-1"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Grid */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <Badge className="mb-4 bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
                                <Award className="w-3 h-3 mr-1" />
                                আমাদের অর্জন
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                গর্বের মুহূর্তসমূহ
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {achievements.map((achievement, index) => (
                                <Card key={index} className="hover:shadow-lg transition-all group hover:border-secondary-500">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <p className="text-sm text-gray-700 font-medium leading-relaxed">{achievement}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Target className="w-16 h-16 mx-auto mb-6 text-secondary-400" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            আমাদের ভিশন ও মিশন
                        </h2>
                        <p className="text-xl mb-6 text-primary-100 leading-relaxed">
                            <strong className="text-secondary-400">ভিশন:</strong> বাংলাদেশের প্রতিটি তরুণকে বিশ্বমানের
                            প্রযুক্তি শিক্ষায় দক্ষ করে গড়ে তোলা এবং আন্তর্জাতিক বাজারে প্রতিযোগিতায় সক্ষম করা।
                        </p>
                        <p className="text-xl text-primary-100 leading-relaxed">
                            <strong className="text-secondary-400">মিশন:</strong> বাস্তবভিত্তিক প্রশিক্ষণ, অভিজ্ঞ মেন্টরশিপ,
                            এবং লাইফটাইম সাপোর্টের মাধ্যমে প্রতিটি শিক্ষার্থীকে সফল ক্যারিয়ার গড়তে সহায়তা করা।
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
                        <CardContent className="pt-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                আপনিও হতে পারেন আমাদের পরবর্তী সফলতার গল্প
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                                ২৫ বছরের অভিজ্ঞতা, ৫০০০+ সফল শিক্ষার্থী, এবং আন্তর্জাতিক মানের প্রশিক্ষণ -
                                আপনার সফল ক্যারিয়ারের যাত্রা শুরু করুন আজই!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a href="/courses" className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-lg hover:shadow-xl">
                                    কোর্স দেখুন
                                </a>
                                <a href="/contact-us" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                                    যোগাযোগ করুন
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
