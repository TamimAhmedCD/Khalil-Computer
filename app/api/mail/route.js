
import StudentRegistrationEmail from "@/emails/StudentRegistrationEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const body = await request.json();
    console.log(body)
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: 'khalilcomputer@gmail.com',
        subject: `নতুন শিক্ষার্থী নিবন্ধন - ${body.studentName}`,
        react: StudentRegistrationEmail({
            ...body, submissionDate: new Date()
        })
    });
    console.log("Email Sent successfully", data)
    if (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({message:"Error"})
    }
    return NextResponse.json({message:"Email sent successfully", data})
}