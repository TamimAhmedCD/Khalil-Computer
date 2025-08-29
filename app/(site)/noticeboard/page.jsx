'use client'
import { useState } from 'react';
import { FilterBar } from '@/components/NoticeBoard/FilterBar';
import { NoticeCard } from '@/components/NoticeBoard/NoticeCard';
import { NoticeModal } from '@/components/NoticeBoard/NoticeBoardDetailsModal';
// import { NoticeModal } from './NoticeModal';

const sampleNotices = [
    {
        id: 1,
        title: 'পরীক্ষার রুটিন প্রকাশ',
        date: '২৫ ডিসেম্বর, ২০২৪',
        description: 'আগামী জানুয়ারি মাসের পরীক্ষার রুটিন প্রকাশিত হয়েছে। সকল শিক্ষার্থীদের নিজ নিজ কোর্সের সময়সূচি দেখে নিতে বলা হচ্ছে।',
        category: 'urgent',
        isNew: true,
        isPinned: true
    },
    {
        id: 2,
        title: 'নতুন কম্পিউটার কোর্স চালু',
        date: '২৩ ডিসেম্বর, ২০২৪',
        description: 'ওয়েব ডেভেলপমেন্ট এবং গ্রাফিক্স ডিজাইন এর উপর নতুন কোর্স চালু হয়েছে। আগ্রহী শিক্ষার্থীরা আজই ভর্তি হতে পারেন।',
        category: 'course',
        isNew: true,
        isPinned: false
    },
    {
        id: 3,
        title: 'ছুটির দিন ঘোষণা',
        date: '২০ ডিসেম্বর, ২০২৪',
        description: 'আগামী ২৬ ডিসেম্বর থেকে ২ জানুয়ারি পর্যন্ত প্রতিষ্ঠান বন্ধ থাকবে। শীতকালীন ছুটির কারণে সকল ক্লাস স্থগিত।',
        category: 'office',
        isNew: false,
        isPinned: false
    },
    {
        id: 4,
        title: 'সার্টিফিকেট বিতরণ',
        date: '১৮ ডিসেম্বর, ২০২৪',
        description: 'সম্প্রতি সমাপ্ত কোর্সের সার্টিফিকেট বিতরণ করা হবে। সংশ্লিষ্ট শিক্ষার্থীরা অফিস সময়ে এসে সংগ্রহ করতে পারেন।',
        category: 'general',
        isNew: false,
        isPinned: false
    },
    {
        id: 5,
        title: 'ল্যাব সময়সূচি পরিবর্তন',
        date: '১৫ ডিসেম্বর, ২০২৪',
        description: 'কম্পিউটার ল্যাবের নতুন সময়সূচি কার্যকর হবে। সকল ব্যাচের শিক্ষার্থীদের নতুন সময়সূচি অনুযায়ী ক্লাসে উপস্থিত হতে হবে।',
        category: 'urgent',
        isNew: false,
        isPinned: false
    },
    {
        id: 6,
        title: 'মাসিক ফি জমা দেওয়ার সময়',
        date: '১২ ডিসেম্বর, ২০২৪',
        description: 'ডিসেম্বর মাসের ফি আগামী ৩১ ডিসেম্বরের মধ্যে জমা দিতে হবে। বিলম্ব ফি এর জন্য অতিরিক্ত চার্জ প্রযোজ্য হবে।',
        category: 'office',
        isNew: false,
        isPinned: false
    }
];


export default function NoticeBoard() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredNotices = sampleNotices.filter((notice) => {
        if (selectedFilter === "all") return true;
        return notice.category === selectedFilter;
    });

    // Sort notices: pinned first
    const sortedNotices = [...filteredNotices].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
    });

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNotice(null);
    };

    return (
        <section className="min-h-screen bg-background py-12">
            <div className="">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold font-bangla text-foreground mb-4">
                        নোটিশ বোর্ড
                    </h1>
                    <p className="text-lg text-muted-foreground font-bangla max-w-2xl mx-auto">
                        খালিল কম্পিউটার ইনস্টিটিউটের সকল গুরুত্বপূর্ণ নোটিশ ও আপডেট
                    </p>
                </div>

                {/* Filter Bar */}
                <FilterBar
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                />

                {/* Notice Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {sortedNotices.map((notice, index) => (
                        <NoticeCard
                            key={notice.id}
                            notice={notice}
                            animationDelay={index * 0.1}
                            onReadMore={handleNoticeClick}
                        />
                    ))}
                </div>

                {filteredNotices.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground font-bangla text-lg">
                            কোন নোটিশ পাওয়া যায়নি।
                        </p>
                    </div>
                )}

                {/* Notice Details Modal */}
                <NoticeModal
                    notice={selectedNotice}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </section>
    );
};
