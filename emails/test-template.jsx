import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components"

export const EnrollmentEmail = ({
    studentName,
    courseName,
    orderId,
    status = "পেমেন্ট যাচাই চলছে",
    estimatedTime = "২৪ ঘণ্টার মধ্যে",
    paymentMethod,
    price,
    discountAmount,
    totalPaid,
}) => {
    return (
        <Html>
            <Head />
            <Preview>কোর্স ইনরোলমেন্ট নিশ্চিতকরণ - {courseName}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={logo} className="py-5">খলিল কম্পিউটার</Heading>
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        {/* Greeting */}
                        <Heading as="h2" style={greeting} className="pl-5 pt-5">
                            প্রিয় {studentName},
                        </Heading>
                        <Text style={messageText} className="px-5">আপনার কোর্স ইনরোলমেন্ট সফল হয়েছে!</Text>

                        {/* Status Message */}
                        <Section style={statusContainer}>
                            <Text style={statusText} className="px-5 pt-3">কোর্সে ইনরোল করার জন্য ধন্যবাদ! পেমেন্ট যাচাইয়ের পর কনফার্মেশন ইমেইল পাবেন।</Text>
                            <Text style={estimatedTimeText} className="px-5 pb-3">সাধারণত {estimatedTime} যাচাই সম্পন্ন হয়।</Text>
                        </Section>

                        {/* Order Details */}
                        <Heading as="h3" style={sectionTitle} className="px-5">
                            অর্ডার বিবরণ
                        </Heading>
                        <Section style={detailsContainer}>
                            <Row style={detailRow}>
                                <Column style={detailLabel} className="pl-5">কোর্স:</Column>
                                <Column style={detailValue}>{courseName}</Column>
                            </Row>
                            <Row style={detailRow}>
                                <Column style={detailLabel}>অর্ডার আইডি:</Column>
                                <Column style={detailValue}>{orderId}</Column>
                            </Row>
                            <Row style={detailRow}>
                                <Column style={detailLabel}>স্ট্যাটাস:</Column>
                                <Column style={statusValue}>{status}</Column>
                            </Row>
                            <Row style={detailRow}>
                                <Column style={detailLabel}>পেমেন্ট মেথড:</Column>
                                <Column style={detailValue}>{paymentMethod}</Column>
                            </Row>
                        </Section>

                        {/* Price Breakdown */}
                        <Heading as="h3" style={sectionTitle}>
                            মূল্য বিবরণ
                        </Heading>
                        <Section style={detailsContainer}>
                            <Row style={detailRow}>
                                <Column style={detailLabel}>সাবটোটাল:</Column>
                                <Column style={detailValue}>{price}</Column>
                            </Row>
                            <Row style={detailRow}>
                                <Column style={detailLabel}>ডিসকাউন্ট:</Column>
                                <Column style={discountValue}>-{discountAmount}</Column>
                            </Row>
                            <Hr style={divider} />
                            <Row style={totalRow}>
                                <Column style={totalLabel}>সর্বমোট:</Column>
                                <Column style={totalValue}>{totalPaid}</Column>
                            </Row>
                        </Section>

                        {/* Next Steps */}
                        <Heading as="h3" style={sectionTitle}>
                            পরবর্তী ধাপ
                        </Heading>
                        <Section style={stepsContainer}>
                            <Text style={stepText}>• পেমেন্ট যাচাই সম্পন্ন হলে আপনি একটি নিশ্চিতকরণ ইমেইল পাবেন</Text>
                            <Text style={stepText}>• আপনার কোর্স অ্যাকসেস অন করা হবে</Text>
                            <Text style={stepText}>• আপনার ড্যাশবোর্ডে কোর্স দেখতে পাবেন</Text>
                        </Section>

                        {/* Help Section */}
                        <Text style={helpText}>
                            কোন প্রশ্ন থাকলে, অনুগ্রহ করে{" "}
                            <Link href="mailto:support@khalilcomputer.com" style={link}>
                                support@khalilcomputer.com
                            </Link>{" "}
                            এ যোগাযোগ করুন।
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>© {new Date().getFullYear()} খলিল কম্পিউটার। সর্বসত্ব সংরক্ষিত।</Text>
                        <Text style={footerText}>মুক্তিযোদ্ধা কমপ্লেক্স, বড়লেখা, মৌলভীবাজার।</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default EnrollmentEmail

// Styles
const main = {
    backgroundColor: "#f9fafb",
    fontFamily: "Hind Siliguri, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    padding: "20px",
}

const container = {
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
}

const header = {
    backgroundColor: "#7c3aed",
    padding: "24px 10px",
    textAlign: "center",
}

const logo = {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    margin: "0",
}

const content = {
    padding: "32px 24px",
}

const greeting = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 8px 0",
}

const messageText = {
    fontSize: "16px",
    color: "#4b5563",
    margin: "0 0 24px 0",
}

const statusContainer = {
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "24px",
}

const statusText = {
    fontSize: "15px",
    color: "#1f2937",
    margin: "0 0 8px 0",
    fontWeight: "500",
}

const estimatedTimeText = {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0",
}

const sectionTitle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#4b5563",
    margin: "0 0 12px 0",
    padding: "4px 1.25rem",
}

const detailsContainer = {
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    padding: "16px",
    marginBottom: "24px",
}

const detailRow = {
    margin: "0 0 8px 0",
}

const detailLabel = {
    width: "50%",
    fontSize: "14px",
    color: "#6b7280",
    padding: "4px 1.25rem",
}

const detailValue = {
    width: "50%",
    fontSize: "14px",
    color: "#1f2937",
    fontWeight: "500",
    textAlign: "right",
    padding: "4px 1.25rem",
}

const statusValue = {
    width: "50%",
    fontSize: "14px",
    color: "#d97706",
    fontWeight: "500",
    textAlign: "right",
    padding: "4px 1.25rem",
}

const discountValue = {
    width: "50%",
    fontSize: "14px",
    color: "#10b981",
    fontWeight: "500",
    textAlign: "right",
    padding: "4px 1.25rem",
}

const divider = {
    borderColor: "#e5e7eb",
    margin: "12px 0",
    borderStyle: "dashed",
}

const totalRow = {
    margin: "8px 0 0 0",
}

const totalLabel = {
    width: "50%",
    fontSize: "15px",
    color: "#4b5563",
    fontWeight: "600",
    padding: "4px 1.25rem",
}

const totalValue = {
    width: "50%",
    fontSize: "16px",
    color: "#1f2937",
    fontWeight: "700",
    textAlign: "right",
    padding: "4px 1.25rem",
}

const stepsContainer = {
    marginBottom: "24px",
}

const stepText = {
    fontSize: "14px",
    color: "#4b5563",
    margin: "0 0 8px 1.25rem",
    lineHeight: "1.5",
}

const helpText = {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0 0 24px 1.25rem",
}

const link = {
    color: "#7c3aed",
    textDecoration: "none",
}

const footer = {
    backgroundColor: "#f9fafb",
    padding: "20px 24px",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
}

const footerText = {
    fontSize: "12px",
    color: "#6b7280",
    margin: "4px 0",
}
