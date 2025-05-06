import EnrollmentEmail from "@/emails/test-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const { data, error } = await resend.emails.send({
    from: "info@khalilcomputer.com", //onboarding@resend.dev
    to: "tamim20072@gmail.com",
    subject: `আপনার কোর্স ইনরোলমেন্ট সফল হয়েছে!`,
    react: EnrollmentEmail({ ...body }),
  });
  if (error) {
    return NextResponse.json({ message: "Error", error });
  }
  return NextResponse.json({ message: "Email sent successfully", data });
}
