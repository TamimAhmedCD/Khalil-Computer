import Admission from "@/emails/admission";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const { data, error } = await resend.emails.send({
    from: "info@khalilcomputer.com",
    to: "khalilcomputer@gmail.com",
    subject: `${body.studentName} নতুন নিবন্ধন সম্পন্ন করেছেন`,
    react: Admission({
      ...body,
      registrationTime: new Date(),
    }),
  });
  if (error) {
    return NextResponse.json({ message: "Error", error });
  }
  return NextResponse.json({ message: "Email sent successfully", data });
}
