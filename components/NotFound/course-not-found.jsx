'use client';
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CourseNotFound = () => {
    const navigate = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-md border-none">
                <CardHeader className="flex flex-col items-center pb-2">
                    <div className="rounded-full bg-red-50 p-3 mb-2">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        কোর্স পাওয়া যায়নি
                    </h2>
                </CardHeader>

                <CardContent className="text-center pb-2">
                    <p className="text-gray-600 mb-4">
                        দুঃখিত, আপনি যে কোর্সটি খুঁজছেন তা আমাদের সিস্টেমে পাওয়া যায়নি।
                        হতে পারে কোর্সটি সরানো হয়েছে অথবা লিংকটি ভুল।
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button
                        variant="outline"
                        onClick={() => navigate.back()}
                        className="w-full sm:w-auto"
                    >
                        পূর্বের পাতায় ফিরুন
                    </Button>
                    <Button
                        onClick={() => navigate.push('/courses')}
                        className="w-full sm:w-auto"
                    >
                        সকল কোর্স দেখুন
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CourseNotFound;
