import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const isSignedIn = Boolean(request.auth?.user);
  const isAdmin = request.auth?.user.role === "ADMIN";

  if (pathname.startsWith("/admin") && !isAdmin) {
    const redirectUrl = new URL(isSignedIn ? "/account" : "/sign-in", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    (pathname.startsWith("/account") || pathname.startsWith("/checkout")) &&
    !isSignedIn
  ) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
};
