import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.AUTH_SECRET, // same as in authOptions
  // });
  // const { pathname } = request.nextUrl;
  // if (
  //   !token &&
  //   (pathname.startsWith("/admin") || pathname.startsWith("/student"))
  // ) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  // matcher: ["/admin/:path*", "/student/:path*", "/auth"],
};
