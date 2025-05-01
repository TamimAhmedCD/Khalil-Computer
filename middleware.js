import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const AUTH_SECRET = process.env.AUTH_SECRET;

const PUBLIC_ROUTES = ["/", "/api/auth"];
const ADMIN_ROUTES = ["/admin"];
const STUDENT_ROUTES = ["/student"];

function isMatchingRoute(pathname, routes) {
  return routes.some((route) => pathname.startsWith(route));
}

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const token = await getToken({ req: request, secret: AUTH_SECRET });

  const isAuthPage = pathname.startsWith("/auth");
  const isAdminRoute = isMatchingRoute(pathname, ADMIN_ROUTES);
  const isStudentRoute = isMatchingRoute(pathname, STUDENT_ROUTES);
  const isProtectedRoute = isAdminRoute || isStudentRoute;

  // ✅ Allow static & public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_ROUTES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // 🔒 Not logged in & accessing protected route → redirect to /auth
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // ✅ Logged in user accessing /auth → redirect to their dashboard based on role
  if (token && isAuthPage) {
    const redirectTo =
      token.role === "admin"
        ? "/admin/dashboard"
        : token.role === "student"
          ? "/student/dashboard"
          : "/";
    return NextResponse.redirect(new URL(redirectTo, origin));
  }

  // ✅ Role-based access control
  if (token) {
    if (isAdminRoute && token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }
    if (isStudentRoute && token.role !== "student") {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
