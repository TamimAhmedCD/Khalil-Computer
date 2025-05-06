import parse from 'html-react-parser';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"

export function OrderSummary({ course }) {
    const discountAmount = course.discount ? (course.price * course.discount) / 100 : 0
    const discountedPrice = course.price - discountAmount // Discounted price
    const total = discountedPrice // Total after discount

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">অর্ডার সারাংশ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">কোর্সের মূল্য</span>
                        <span>
                            {course.discount ? (
                                <>
                                    <span className="line-through text-muted-foreground mr-2">
                                        ৳{course.price.toLocaleString()} {/* Showing original price */}
                                    </span>
                                    <span>৳{discountedPrice.toLocaleString()}</span> {/* Showing discounted price */}
                                </>
                            ) : (
                                <span>৳{course.price.toLocaleString()}</span>
                            )}
                        </span>
                    </div>

                    {/* Display how much saved due to discount */}
                    {course.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>আপনি সাশ্রয় করেছেন</span>
                            <span>৳{discountAmount.toLocaleString()}</span> {/* Saved amount */}
                        </div>
                    )}
                </div>

                <Separator />

                {/* Show total price after discount */}
                <div className="flex justify-between font-bold text-lg">
                    <span>মোট</span>
                    <span>৳{total.toLocaleString()}</span> {/* Total price after discount */}
                </div>

                {/* Benefits List */}
                <div className="prose">{parse(course?.whatInside)}</div>
            </CardContent>

            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    * পেমেন্ট সম্পন্ন হওয়ার পর আপনি তাৎক্ষণিকভাবে কোর্সে অ্যাক্সেস পাবেন
                </p>
            </CardFooter>
        </Card>
    )
}
