import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (req.auth) return;

  // Silent 404 for the API — don't reveal the route to scanners.
  if (pathname.startsWith("/api/admin")) {
    return new NextResponse("Not found", { status: 404 });
  }
  const signin = new URL("/api/auth/signin", req.nextUrl);
  signin.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(signin);
});

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*"],
};
