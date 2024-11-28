import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/gentle-api")) {
    const url = req.nextUrl.clone();
    const pathName = `${process.env.NEXT_PUBLIC_CHAT_API_URL}/${url.pathname.split("/").slice(2).join("/")}${url.search}`;
    return NextResponse.rewrite(pathName);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gentle-api/:path*"],
};
