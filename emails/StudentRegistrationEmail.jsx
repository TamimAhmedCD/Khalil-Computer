import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components"
import { format } from "date-fns"

const StudentRegistrationEmail = ({
    studentName,
    fatherName,
    motherName,
    currentAddress,
    permanentAddress,
    studentMobile,
    guardianMobile,
    email,
    education,
    birthDate,
    occupation,
    maritalStatus,
    course,
    gender,
    bloodGroup,
    submissionDate,
}) => {
    const formattedBirthDate = format(new Date(birthDate), "dd/MM/yyyy")
    const formattedSubmissionDate = format(new Date(submissionDate), "dd/MM/yyyy HH:mm")

    return (
        <Html>
            <Head />
            <Preview>নতুন শিক্ষার্থী নিবন্ধন - {studentName}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Img
                            src="/public/logo.png"
                            width="200"
                            height="60"
                            alt="প্রশিক্ষণ কেন্দ্র"
                            style={logo}
                        />
                    </Section>

                    {/* Title */}
                    <Heading style={heading}>নতুন শিক্ষার্থী নিবন্ধন</Heading>
                    <Text style={subheading}>
                        নিচে {studentName} এর নিবন্ধন তথ্য দেওয়া হলো। নিবন্ধন সম্পন্ন হয়েছে {formattedSubmissionDate} তারিখে।
                    </Text>

                    <Hr style={hr} />

                    {/* Personal Information */}
                    <Section style={section}>
                        <Heading as="h2" style={sectionHeading}>
                            ব্যক্তিগত তথ্য
                        </Heading>
                        <Row style={row}>
                            <Column style={column}>
                                <Text style={labelText}>শিক্ষার্থীর নাম</Text>
                                <Text style={valueText}>{studentName}</Text>
                            </Column>
                            <Column style={column}>
                                <Text style={labelText}>জন্ম তারিখ</Text>
                                <Text style={valueText}>{formattedBirthDate}</Text>
                            </Column>
                        </Row>
                        <Row style={row}>
                            <Column style={column}>
                                <Text style={labelText}>পিতার নাম</Text>
                                <Text style={valueText}>{fatherName}</Text>
                            </Column>
                            <Column style={column}>
                                <Text style={labelText}>মাতার নাম</Text>
                                <Text style={valueText}>{motherName}</Text>
                            </Column>
                        </Row>
                        <Row style={row}>
                            <Column style={column}>
                                <Text style={labelText}>লিঙ্গ</Text>
                                <Text style={valueText}>{gender}</Text>
                            </Column>
                            <Column style={column}>
                                <Text style={labelText}>বৈবাহিক অবস্থা</Text>
                                <Text style={valueText}>{maritalStatus}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    {/* Contact Information */}
                    <Section style={section}>
                        <Heading as="h2" style={sectionHeading}>
                            যোগাযোগের তথ্য
                        </Heading>
                        <Row style={row}>
                            <Column style={column}>
                                <Text style={labelText}>বর্তমান ঠিকানা</Text>
                                <Text style={valueText}>{currentAddress}</Text>
                            </Column>
                            <Column style={column}>
                                <Text style={labelText}>স্থায়ী ঠিকানা</Text>
                                <Text style={valueText}>{permanentAddress}</Text>
                            </Column>
                        </Row>
                        <Row style={row}>
                            <Column style={column}>
                                <Text style={labelText}>শিক্ষার্থীর মোবাইল</Text>
                                <Text style={valueText}>{studentMobile}</Text>
                            </Column>
                            <Column style={column}>
                                <Text style={labelText}>অভিভাবকের মোবাইল</Text>
                                <Text style={valueText}>{guardianMobile}</Text>
                            </Column>
                        </Row>
                        <Row style={row}>
                            <Column style={fullColumn}>
                                <Text style={labelText}>ইমেইল ঠিকানা</Text>
                                <Text style={valueText}>{email}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    {/* Educational Information */}
                    <Section style={section}>
                        <Heading as="h2" style={sectionHeading}>
                            শিক্ষাগত ও অন্যান্য তথ্য
                        </Heading>
                        <Row style={row}>
                            <Column style={column}>
                                <Text style={labelText}>শিক্ষাগত যোগ্যতা</Text>
                                <Text style={valueText}>{education}</Text>
                            </Column>
                            <Column style={column}>
                                <Text style={labelText}>পেশা</Text>
                                <Text style={valueText}>{occupation}</Text>
                            </Column>
                        </Row>
                        <Row style={row}>
                            <Column style={column}>
                                <Text style={labelText}>নির্বাচিত কোর্স</Text>
                                <Text style={valueText}>{course}</Text>
                            </Column>
                            <Column style={column}>
                                <Text style={labelText}>রক্তের গ্রুপ</Text>
                                <Text style={valueText}>{bloodGroup}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={hr} />

                    {/* Action Button */}
                    <Section style={actionSection}>
                        <Link style={button} href="https://example.com/admin/students">
                            সকল শিক্ষার্থী দেখুন
                        </Link>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>এই ইমেইলটি আপনার প্রশিক্ষণ কেন্দ্রের ওয়েবসাইট থেকে স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।</Text>
                        <Text style={footerText}>© {new Date().getFullYear()} প্রশিক্ষণ কেন্দ্র। সর্বস্বত্ব সংরক্ষিত।</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default StudentRegistrationEmail

// Styles
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
}

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    maxWidth: "600px",
}

const header = {
    backgroundColor: "#f0f7ff",
    padding: "20px 0",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    textAlign: "center",
    borderBottom: "1px solid #e6ebf1",
}

const logo = {
    margin: "0 auto",
}

const heading = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "30px 0 10px",
    color: "#2563eb",
}

const subheading = {
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center",
    margin: "0 40px 40px",
    color: "#4b5563",
}

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
}

const section = {
    padding: "0 40px",
}

const sectionHeading = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "20px 0 10px",
    color: "#2563eb",
    backgroundColor: "#f0f7ff",
    padding: "8px 12px",
    borderRadius: "4px",
}

const row = {
    display: "flex",
    flexDirection: "row",
    marginBottom: "8px",
}

const column = {
    width: "50%",
    padding: "0 10px",
}

const fullColumn = {
    width: "100%",
    padding: "0 10px",
}

const labelText = {
    fontSize: "14px",
    color: "#6b7280",
    margin: "8px 0 4px",
}

const valueText = {
    fontSize: "16px",
    color: "#111827",
    margin: "0 0 16px",
    fontWeight: "500",
}

const actionSection = {
    textAlign: "center",
    margin: "40px 0 20px",
}

const button = {
    backgroundColor: "#2563eb",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    padding: "12px 24px",
    fontWeight: "bold",
}

const footer = {
    textAlign: "center",
    margin: "40px 0 0",
    padding: "0 40px",
}

const footerText = {
    fontSize: "14px",
    color: "#6b7280",
    margin: "8px 0",
}
