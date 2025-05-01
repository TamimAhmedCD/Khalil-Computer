import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET, // ✅ Corrected
  });

  const { pathname } = request.nextUrl;

  console.log("🔑 Middleware token:", token);
  console.log("🌐 Pathname:", pathname);

  if (pathname === "/auth" && token) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (token.role === "student") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  if (pathname.startsWith("/student")) {
    if (!token || token.role !== "student") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/auth"],
};
