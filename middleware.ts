
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Check if accessing protected admin routes
  if (request.nextUrl.pathname.startsWith("/me/dashboard")) {
    const token = request.cookies.get("auth_token")?.value;
    
    // Always allow if checking auth, otherwise verify
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL("/me", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/me/dashboard/:path*"],
};
