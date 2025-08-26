import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CalendarDays, ArrowRight, Pin, AlertCircle, BookOpen, Building2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const NoticeCard = ({ notice, animationDelay = 0, onReadMore }) => {
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
        <Card
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border animate-fade-in cursor-pointer"
            style={{
                animationDelay: `${animationDelay}s`,
                animationFillMode: 'both'
            }}
        >
            {/* Pinned indicator */}
            {notice.isPinned && (
                <div className="absolute top-3 right-3 text-primary">
                    <Pin className="w-4 h-4 fill-current" />
                </div>
            )}

            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg text-card-foreground line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                            {notice.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarDays className="w-4 h-4" />
                            <span className="text-sm">{notice.date}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                    {getCategoryBadge()}
                </div>
            </CardHeader>

            <CardContent className="pt-0 pb-4">
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {notice.description}
                </p>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReadMore(notice)}
                    className="w-full group-hover:bg-primary-600 group-hover:text-primary-foreground transition-all duration-300 font-medium border-border hover:border-primary"
                >
                    <span>বিস্তারিত পড়ুন</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
            </CardFooter>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
};