// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(request) {
//   // const token = await getToken({
//   //   req: request,
//   //   secret: process.env.AUTH_SECRET, // same as in authOptions
//   // });
//   // const { pathname } = request.nextUrl;
//   // if (
//   //   !token &&
//   //   (pathname.startsWith("/admin") || pathname.startsWith("/student"))
//   // ) {
//   //   return NextResponse.redirect(new URL("/auth", request.url));
//   // }
//   // return NextResponse.next();
// }

// export const config = {
//   // matcher: ["/admin/:path*", "/student/:path*", "/auth"],
// };
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Security configuration
const AUTH_SECRET = process.env.AUTH_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const PUBLIC_ROUTES = ["/", "/auth", "/api/auth"];
const ADMIN_ROUTES = ["/admin"];
const STUDENT_ROUTES = ["/student"];

export async function middleware(request) {
  try {
    const { pathname } = request.nextUrl;
    const requestHeaders = new Headers(request.headers);

    // 1. Apply security headers to all responses
    requestHeaders.set("X-Frame-Options", "DENY");
    requestHeaders.set("X-Content-Type-Options", "nosniff");
    requestHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // 2. Skip middleware for public routes and API routes
    if (
      PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon.ico")
    ) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // 3. Verify authentication token
    const token = await getToken({
      req: request,
      secret: AUTH_SECRET,
    });

    // 4. Handle unauthenticated users
    if (!token) {
      const redirectUrl = new URL("/auth", request.url);
      redirectUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // 5. Validate token expiration
    if (token.exp && Date.now() >= token.exp * 1000) {
      const redirectUrl = new URL("/auth", request.url);
      redirectUrl.searchParams.set("error", "session-expired");
      return NextResponse.redirect(redirectUrl);
    }

    // 6. Role-based access control
    if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    if (STUDENT_ROUTES.some((route) => pathname.startsWith(route))) {
      if (token.role !== "student") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
    // 7. Add user info to headers for backend use
    requestHeaders.set("x-user-id", token.sub || "");
    requestHeaders.set("x-user-role", token.role || "");

    // 8. Continue with the request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // 9. Handle errors securely
    console.error("Authentication Middleware Error:", error);

    if (NODE_ENV === "development") {
      return NextResponse.json(
        { error: "Middleware error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/auth?error=server-error", request.url)
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public routes
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
