import { collection } from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, password, confirmPassword } = await request.json();

  const isValidEmail = (email) => {
    const emailREgex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailREgex.test(email);
  };

  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "সব ফিল্ড পূর্ণ করতে হবে" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "অবৈধ ইমেইল ফরম্যাট" },
      { status: 400 }
    );
  }

  if (confirmPassword !== password) {
    return NextResponse.json({ message: "পাসওয়ার্ড মেলেনি" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" },
      { status: 400 }
    );
  }

  try {
    const userCollection = await collection("users");
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "ব্যবহারকারী ইতিমধ্যেই আছে" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      name,
      password: hashedPassword,
      role: "student",
    };

    await userCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "ব্যবহারকারী তৈরি হয়েছে" },
      { status: 201 }
    );
  } catch (error) {
    console.log("সিস্টেম ত্রুটি:", error);
    return NextResponse.json({ message: "কিছু ভুল হয়েছে" }, { status: 500 });
  }
}
