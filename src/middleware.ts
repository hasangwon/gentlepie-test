import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/gentle")) {
    const baseUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;

    if (!baseUrl) {
      console.error("NEXT_PUBLIC_CHAT_API_URL is not defined.");
      return NextResponse.next();
    }

    const newPath = req.nextUrl.pathname.replace("/gentle", "");
    const targetUrl = `${baseUrl}${newPath}${req.nextUrl.search || ""}`;
    return NextResponse.rewrite(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gentle/:path*"],
};
