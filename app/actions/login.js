"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginAction(email, password) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    // Just return success, let client decide where to go
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error:
          error.type === "CredentialsSignin"
            ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়"
            : "ইমেইল বা পাসওয়ার্ড সঠিক নয়",
      };
    }

    return {
      success: false,
      error: "অজানা ত্রুটি, আবার চেষ্টা করুন",
    };
  }
}
