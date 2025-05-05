import FreeSeminarEmail from "@/emails/FreeSeminarEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "khalilcomputer@gmail.com",
    subject: `${body.studentName} ডিসকাউন্ট অফারের জন্য একটি নতুন নিবন্ধন সম্পন্ন করেছেন`,
    react: FreeSeminarEmail({
      ...body,
      registrationTime: new Date(),
    }),
  });
  if (error) {
    return NextResponse.json({ message: "Error", error });
  }
  return NextResponse.json({ message: "Email sent successfully", data });
}
