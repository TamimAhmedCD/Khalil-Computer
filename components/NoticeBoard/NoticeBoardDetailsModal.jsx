import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { CalendarDays, X, Pin, AlertCircle, BookOpen, Building2, FileText, PhoneCall } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const NoticeModal = ({ notice, isOpen, onClose }) => {
    if (!notice) return null;

    const getCategoryBadge = () => {
        switch (notice.category) {
            case "urgent":
                return (
                    <Badge className="bg-red-500 text-white font-medium flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        জরুরি
                    </Badge>
                );
            case "course":
                return (
                    <Badge className="bg-primary-600 text-primary-foreground font-medium flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        কোর্স
                    </Badge>
                );
            case "office":
                return (
                    <Badge className="bg-secondary text-secondary-foreground font-medium flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        অফিস
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="font-medium flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        সাধারণ
                    </Badge>
                );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <DialogTitle className="font-bangla text-xl md:text-2xl font-bold text-foreground mb-3 leading-relaxed">
                                {notice.title}
                                {notice.isPinned && (
                                    <Pin className="inline-block w-5 h-5 ml-2 text-primary fill-current" />
                                )}
                            </DialogTitle>

                            <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                <CalendarDays className="w-4 h-4" />
                                <span className="font-bangla text-sm">{notice.date}</span>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                {getCategoryBadge()}
                                {notice.isNew && (
                                    <Badge className="bg-primary-600 text-white font-bangla font-medium">
                                        🟢 নতুন নোটিশ
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <DialogDescription asChild>
                    <div className="space-y-6">
                        {/* Notice Content */}
                        <div className="bg-muted/30 rounded-lg p-6">
                            <h3 className="font-bangla font-semibold text-lg mb-3 text-foreground">
                                📋 নোটিশের বিস্তারিত
                            </h3>
                            <p className="font-bangla text-muted-foreground leading-relaxed text-base">
                                {notice.description}
                            </p>
                        </div>

                        {/* Additional Information */}
                        <div className="bg-card border rounded-lg p-6">
                            <h3 className="font-bangla font-semibold text-lg mb-4 text-foreground">
                                📞 যোগাযোগের তথ্য
                            </h3>
                            <div className="space-y-2 text-sm font-bangla text-muted-foreground">
                                <p>📧 ইমেইল: info@khalilcomputer.edu.bd</p>
                                <p>📱 ফোন: ০১৭১২-৩৪৫৬৭৮</p>
                                <p>🏢 ঠিকানা: খালিল কম্পিউটার ইনস্টিটিউট</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                variant="default"
                                className="flex-1 font-bangla font-medium bg-primary-600 text-white hover:bg-primary-600/80"
                            >
                                <a href="tel:+8801715409109" className="flex items-center gap-1">
                                    <PhoneCall className="w-4 h-4" />
                                    যোগাযোগ করুন
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 font-bangla font-medium"
                            >
                                📋 প্রিন্ট করুন
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 font-bangla font-medium"
                            >
                                ❌ বন্ধ করুন
                            </Button>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};