import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;
  console.log("Base URL:", baseUrl);

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_CHAT_API_URL is not defined.");
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/gentle")) {
    console.log("Original pathname:", req.nextUrl.pathname);

    const newPath = req.nextUrl.pathname.replace("/gentle", "");
    console.log("New Path:", newPath);

    if (!newPath) {
      console.error("New Path is undefined.");
      return NextResponse.next();
    }

    const targetUrl = new URL(`${baseUrl}${newPath}${req.nextUrl.search || ""}`);
    console.log("Rewriting to URL:", targetUrl);

    return NextResponse.rewrite(targetUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gentle/:path*"],
};
