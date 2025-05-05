import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components"
import { format } from "date-fns"

export const AdminNotificationEmail = ({
    studentName,
    studentMobile,
    location,
    occupation,
    course,
    registrationTime
}) => {
    const formattedRegistrationTime = format(new Date(registrationTime), "dd/MM/yyyy HH:mm")
    const previewText = `${studentName} ডিসকাউন্ট অফারের জন্য একটি নতুন নিবন্ধন সম্পন্ন করেছেন`

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Img src="https://khalilcomputer.com/_next/image?url=%2Flogo.png&w=256&q=75" width={120} height={50} alt="লোগো" style={logo} />
                    </Section>

                    {/* Notification Banner */}
                    <Section style={notificationBanner}>
                        <Heading style={notificationTitle}>ডিসকাউন্ট অফারের রেজিস্ট্রেশনন</Heading>
                    </Section>

                    {/* Registration Info */}
                    <Section style={infoSection}>
                        <Text style={infoText}>
                            একজন নতুন শিক্ষার্থী আপনাদের ফ্রি সেমিনারে রেজিস্ট্রেশন করেছেন। নিচে তার বিস্তারিত তথ্য দেওয়া হলো:
                        </Text>
                    </Section>

                    {/* Student Details Card */}
                    <Section style={detailsCard}>
                        <Heading as="h2" style={cardTitle}>
                            শিক্ষার্থীর তথ্য
                        </Heading>

                        <Section style={infoTable}>
                            <Row style={tableRow}>
                                <Column style={tableLabel}>রেজিস্ট্রেশন সময়</Column>
                                <Column style={tableValue}>{formattedRegistrationTime}</Column>
                            </Row>
                            <Row style={tableRow}>
                                <Column style={tableLabel}>নাম</Column>
                                <Column style={tableValue}>{studentName}</Column>
                            </Row>
                            <Row style={tableRow}>
                                <Column style={tableLabel}>মোবাইল</Column>
                                <Column style={tableValue}>{studentMobile}</Column>
                            </Row>
                            <Row style={tableRow}>
                                <Column style={tableLabel}>ঠিকানা</Column>
                                <Column style={tableValue}>{location}</Column>
                            </Row>
                            <Row style={tableRow}>
                                <Column style={tableLabel}>পেশা</Column>
                                <Column style={tableValue}>{occupation}</Column>
                            </Row>
                            <Row style={tableRow}>
                                <Column style={tableLabel}>আগ্রহী কোর্স</Column>
                                <Column style={tableValue}>{course}</Column>
                            </Row>
                        </Section>
                    </Section>

                    {/* Action Buttons */}
                    <Section style={actionSection}>
                        <Link href="https://example.com/admin/registrations" style={viewAllButton}>
                            সকল রেজিস্ট্রেশন দেখুন
                        </Link>
                        <Link href={`https://example.com/admin/student/${studentMobile}`} style={viewDetailsButton}>
                            বিস্তারিত দেখুন
                        </Link>
                    </Section>

                    {/* Stats Section */}
                    <Section style={statsSection}>
                        <Row>
                            <Column style={statColumn}>
                                <Text style={statNumber}>১২৫</Text>
                                <Text style={statLabel}>মোট রেজিস্ট্রেশন</Text>
                            </Column>
                            <Column style={statColumn}>
                                <Text style={statNumber}>৪৫</Text>
                                <Text style={statLabel}>আজকের রেজিস্ট্রেশন</Text>
                            </Column>
                            <Column style={statColumn}>
                                <Text style={statNumber}>৮০%</Text>
                                <Text style={statLabel}>কনভার্সন রেট</Text>
                            </Column>
                        </Row>
                    </Section>

                    {/* Notes */}
                    <Section style={notesSection}>
                        <Text style={notesText}>
                            <strong>বিঃদ্রঃ</strong> এই শিক্ষার্থীর সাথে যোগাযোগ করার জন্য উপরের "বিস্তারিত দেখুন" বাটনে ক্লিক করুন। সেমিনারের আগে
                            শিক্ষার্থীকে একটি রিমাইন্ডার এসএমএস পাঠানো হবে।
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            © ২০২৫ আইটি ট্রেনিং সেন্টার। এই ইমেইলটি শুধুমাত্র অ্যাডমিন প্যানেলের অনুমোদিত ব্যবহারকারীদের কাছে পাঠানো হয়েছে।
                        </Text>
                        <Text style={footerLinks}>
                            <Link href="https://example.com/admin" style={footerLink}>
                                অ্যাডমিন প্যানেল
                            </Link>{" "}
                            •
                            <Link href="https://example.com/settings" style={footerLink}>
                                সেটিংস
                            </Link>{" "}
                            •
                            <Link href="https://example.com/help" style={footerLink}>
                                সাহায্য
                            </Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default AdminNotificationEmail

// Styles
const main = {
    backgroundColor: "#f5f5f5",
    fontFamily: "Hind Siliguri, Arial, sans-serif",
}

const container = {
    margin: "0 auto",
    padding: "20px 0",
    maxWidth: "600px",
}

const header = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    borderBottom: "1px solid #eaeaea",
    textAlign: "center",
}

const logo = {
    margin: "0 auto",
}

const notificationBanner = {
    backgroundColor: "#583cea", // emerald-600
    padding: "20px",
    textAlign: "center",
}

const notificationTitle = {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0",
    color: "#ffffff",
}

const infoSection = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderBottom: "1px solid #eaeaea",
}

const infoText = {
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0",
    color: "#333333",
}

const detailsCard = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderBottom: "1px solid #eaeaea",
}

const cardTitle = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 15px",
    color: "#583cea", // emerald-600
    borderBottom: "1px solid #eaeaea",
    paddingBottom: "10px",
}

const infoTable = {
    width: "100%",
    borderCollapse: "collapse",
}

const tableRow = {
    borderBottom: "1px solid #eaeaea",
}

const tableLabel = {
    padding: "10px 0",
    width: "40%",
    color: "#666666",
    fontSize: "14px",
    verticalAlign: "top",
}

const tableValue = {
    padding: "10px 0",
    color: "#333333",
    fontSize: "14px",
    fontWeight: "bold",
    verticalAlign: "top",
}

const actionSection = {
    backgroundColor: "#ffffff",
    padding: "20px",
    textAlign: "center",
    borderBottom: "1px solid #eaeaea",
}

const viewAllButton = {
    backgroundColor: "#583cea", // emerald-600
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    margin: "0 10px",
}

const viewDetailsButton = {
    backgroundColor: "#f0fdf4", // emerald-50
    color: "#583cea", // emerald-600
    padding: "10px 20px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    margin: "0 10px",
    border: "1px solid #583cea",
}

const statsSection = {
    backgroundColor: "#f0fdf4", // emerald-50
    padding: "20px",
    textAlign: "center",
    borderBottom: "1px solid #eaeaea",
}

const statColumn = {
    padding: "0 10px",
}

const statNumber = {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 5px",
    color: "#583cea", // emerald-600
}

const statLabel = {
    fontSize: "12px",
    color: "#666666",
    margin: "0",
}

const notesSection = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderBottom: "1px solid #eaeaea",
}

const notesText = {
    fontSize: "14px",
    lineHeight: "22px",
    margin: "0",
    color: "#666666",
    fontStyle: "italic",
}

const footer = {
    padding: "20px",
    textAlign: "center",
}

const footerText = {
    fontSize: "12px",
    color: "#666666",
    margin: "0 0 10px",
}

const footerLinks = {
    fontSize: "12px",
    color: "#666666",
    margin: "0",
}

const footerLink = {
    color: "#583cea", // emerald-600
    textDecoration: "none",
    margin: "0 5px",
}
