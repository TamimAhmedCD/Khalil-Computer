export async function middleware(request) {
  // const { pathname, origin, searchParams } = request.nextUrl;
  // const token = await getToken({ req: request, secret: AUTH_SECRET });
  // const isAdminRoute = isMatchingRoute(pathname, ADMIN_ROUTES);
  // const isStudentRoute = isMatchingRoute(pathname, STUDENT_ROUTES);
  // const isProtectedRoute = isAdminRoute || isStudentRoute;
  // const isAuthPage = pathname === "/auth";
  // // ✅ Allow all public and static paths
  // if (
  //   pathname.startsWith("/_next") ||
  //   pathname.startsWith("/favicon.ico") ||
  //   PUBLIC_ROUTES.includes(pathname)
  // ) {
  //   return NextResponse.next();
  // }
  // // 🔒 Not logged in trying to access protected route
  // if (!token && isProtectedRoute) {
  //   const redirectUrl = new URL("/auth", request.url);
  //   redirectUrl.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(redirectUrl);
  // }
  // // ✅ Logged in user trying to access /auth → block and redirect to role-based dashboard
  // if (token && isAuthPage) {
  //   let redirectTo = "/";
  //   if (token.role === "admin") redirectTo = "/admin/dashboard";
  //   else if (token.role === "student") redirectTo = "/student/dashboard";
  //   return NextResponse.redirect(new URL(redirectTo, origin));
  // }
  // // ✅ Role-based access control
  // if (token) {
  //   if (isAdminRoute && token.role !== "admin") {
  //     return NextResponse.redirect(new URL("/unauthorized", request.url));
  //   }
  //   if (isStudentRoute && token.role !== "student") {
  //     return NextResponse.redirect(new URL("/unauthorized", request.url));
  //   }
  // }
  // return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
