import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PRODUCT_CHAT_API_URL : process.env.NEXT_PUBLIC_CHAT_API_URL;

  if (!baseUrl) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/gentle")) {
    const newPath = req.nextUrl.pathname.replace("/gentle", "");

    if (!newPath) {
      return NextResponse.next();
    }

    const targetUrl = new URL(`${baseUrl}${newPath}${req.nextUrl.search || ""}`);
    return NextResponse.rewrite(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gentle/:path*"],
};
