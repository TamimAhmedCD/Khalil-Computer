import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Redirect to dashboard if the user is already logged in and tries to visit /auth
  if (pathname === "/auth" && token) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (token.role === "student") {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
  }

  // Protect /admin route
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      // If not logged in or not admin, redirect to login page
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Protect /student route
  if (pathname.startsWith("/student")) {
    if (!token || token.role !== "student") {
      // If not logged in or not student, redirect to login page
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next(); // Allow if everything is fine
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/auth"], // Protect admin, student, and auth paths
};
