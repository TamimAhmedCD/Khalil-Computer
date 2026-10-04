import VerificationCard from "@/components/VerifyCertificate/VerificationCard";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              সার্টিফিকেট যাচাই করুন
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              আপনার সার্টিফিকেটের সত্যতা যাচাই করুন দ্রুত এবং নিরাপদে।
              আমাদের ডিজিটাল ভারিফিকেশন সিস্টেম আপনাকে দ্রুত সার্টিফিকেটের বৈধতা জানতে সাহায্য করে।
            </p>
          </div>
        </div>
      </section>

      {/* Main Verification Section - Full Width Background */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <VerificationCard />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                কিভাবে কাজ করে?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                আমাদের সার্টিফিকেট ভারিফিকেশন প্রক্রিয়া সহজ এবং দ্রুত
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">১</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Student ID লিখুন</h3>
                <p className="text-muted-foreground">
                  সার্টিফিকেটে উল্লেখিত Student ID টি নিচে দেওয়া ফিল্ডে লিখুন।
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">২</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verify বাটনে ক্লিক করুন</h3>
                <p className="text-muted-foreground">
                  সঠিক Student ID লিখার পর Verify বাটনে ক্লিক করুন।
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">৩</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">ফলাফল দেখুন</h3>
                <p className="text-muted-foreground">
                  সার্টিফিকেটের বিস্তারিত তথ্য এবং সত্যতা যাচাই করুন।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-50/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                সার্টিফিকেট ভারিফিকেশনের সুবিধাগুলো
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                আমাদের ডিজিটাল ভারিফিকেশন সিস্টেমের সুবিধাগুলো জানুন
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">দ্রুত ও নিরাপদ</h3>
                  <p className="text-sm text-muted-foreground">
                    কয়েক সেকেন্ডে সার্টিফিকেটের সত্যতা যাচাই করুন। ডাটাবেজের সাথে রিয়েল-টাইম ভারিফিকেশন।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">বাস্তব সময়ের তথ্য</h3>
                  <p className="text-sm text-muted-foreground">
                    আপনার সার্টিফিকেটের তথ্য সরাসরি আমাদের ডাটাবেজ থেকে আপডেটেড পান।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">সম্পূর্ণ বিশ্বস্ত</h3>
                  <p className="text-sm text-muted-foreground">
                    আমাদের ভারিফিকেশন সিস্টেম ১০০% বিশ্বস্ত এবং সুরক্ষিত।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">কোনো খরচ নেই</h3>
                  <p className="text-sm text-muted-foreground">
                    সার্টিফিকেট ভারিফিকেশন সম্পূর্ণ বিনামূল্যে এবং যেকোনো সময় অনলাইনে করা যায়।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
            <CardContent className="pt-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                কোনো সমস্যা হলে যোগাযোগ করুন
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                সার্টিফিকেট ভারিফিকেশনে কোনো সমস্যা হলে আমাদের সাথে যোগাযোগ করুন।
                আমাদের সহায়তা টিম আপনাকে সাহায্য করতে প্রস্তুত।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/contact-us" className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-lg hover:shadow-xl">
                  আমাদের সাথে যোগাযোগ করুন
                </a>
                <a href="tel:+8801715409109" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  কল করুন: +৮৮০১৭১৫৪০৯১০৯
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
