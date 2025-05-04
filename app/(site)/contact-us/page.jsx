'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, Send, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const contactFormSchema = z.object({
    name: z.string().min(2, { message: "নাম কমপক্ষে ২ অক্ষর হতে হবে" }),
    email: z.string().email({ message: "একটি বৈধ ইমেইল ঠিকানা দিন" }),
    subject: z.string().min(5, { message: "বিষয় কমপক্ষে ৫ অক্ষর হতে হবে" }),
    message: z.string().min(10, { message: "বার্তা কমপক্ষে ১০ অক্ষর হতে হবে" }),
});

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("বার্তা সফলভাবে পাঠানো হয়েছে!", {
                description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
            });

            form.reset();
        } catch (error) {
            toast.error("বার্তা পাঠাতে ব্যর্থ হয়েছে", {
                description: "অনুগ্রহ করে আবার চেষ্টা করুন।",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <div className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">যোগাযোগ করুন</h1>
                    <div className="text-muted-foreground max-w-2xl mx-auto">
                        <p className="mb-2">
                            খালিল কম্পিউটার ট্রেনিং সেন্টারে আপনাকে স্বাগতম। কোর্স সম্পর্কে জানতে, ভর্তি সংক্রান্ত তথ্য পেতে, অথবা যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন।
                        </p>
                        <p>
                            আমরা সর্বদা আপনাকে সহায়তা করতে প্রস্তুত আছি। নিচের ফর্মটি পূরণ করে অথবা আমাদের যোগাযোগের তথ্য ব্যবহার করে আমাদের সাথে যোগাযোগ করতে পারেন।
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <Card className="md:col-span-2 shadow-md">
                        <CardContent className="pt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>নাম</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input placeholder="আপনার নাম লিখুন" {...field} />
                                                            <User className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ইমেইল</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input placeholder="আপনার ইমেইল লিখুন" {...field} />
                                                            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>বিষয়</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="আপনার বার্তার বিষয় লিখুন" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>বার্তা</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Textarea
                                                            placeholder="আপনার বার্তা লিখুন..."
                                                            className="min-h-[150px]"
                                                            {...field}
                                                        />
                                                        <MessageSquare className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    দয়া করে আপনার প্রশ্ন বা জিজ্ঞাসা সম্পর্কে বিস্তারিত লিখুন।
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        <Send className="mr-2 h-4 w-4" />
                                        {isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card className="shadow-md bg-khalil-50">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">যোগাযোগের তথ্য</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-khalil-700/10 p-3 rounded-full mr-4">
                                            <Mail className="h-5 w-5 text-khalil-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">ইমেইল</p>
                                            <a href="mailto:contact@khalilcomputer.com" className="text-sm text-khalil-700 hover:underline">
                                                contact@khalilcomputer.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-khalil-700/10 p-3 rounded-full mr-4">
                                            <Phone className="h-5 w-5 text-khalil-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">ফোন নম্বর</p>
                                            <a href="tel:+8801715409109" className="text-sm text-khalil-700 hover:underline">
                                                +8801715409109
                                            </a>
                                            <br />
                                            <a href="tel:+8801715409109" className="text-sm text-khalil-700 hover:underline">
                                                +8801715409109
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-khalil-700/10 p-3 rounded-full mr-4">
                                            <MapPin className="h-5 w-5 text-khalil-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">ঠিকানা</p>
                                            <p className="text-sm">
                                                মুক্তিযোদ্ধা কমপ্লেক্স, বড়লেখা, মৌলভীবাজার।
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Office Hours */}
                        <Card className="shadow-md bg-khalil-50">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">অফিস সময়সূচী</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">শনিবার - বৃহস্পতিবার:</span>
                                        <span className="text-sm font-medium">সকাল ৯:০০ - সন্ধ্যা ৬:০০</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">শুক্রবার:</span>
                                        <span className="text-sm font-medium">সকাল ১০:০০ - বিকাল ৪:০০</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">সরকারি ছুটি:</span>
                                        <span className="text-sm font-medium">বন্ধ</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-10">
                    <Card className="overflow-hidden shadow-md py-0">
                        <div className="h-[400px] w-full bg-muted relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6898142188134!2d92.1901875!3d24.703187500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751c90ccdc2e6c9%3A0x42cf91f581a63547!2zS2hhbGlsIENvbXB1dGVyIOCmluKAjOCmsuCmv-CmsiDgppXigIzgpq7gp43gpqrgpr_gpongpp_gpr7gprA!5e0!3m2!1sen!2sbd!4v1746296020966!5m2!1sen!2sbd"
                                style={{ border: 0, width: '100%', height: '450px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="খালিল কম্পিউটার ট্রেনিং সেন্টার লোকেশন"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;
