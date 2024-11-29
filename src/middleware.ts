import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const originalMethod = req.method; // 요청 메서드 확인
  console.log("Original Request Method:", originalMethod);

  if (req.nextUrl.pathname.startsWith("/gentle")) {
    const baseUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;

    if (!baseUrl) {
      console.error("NEXT_PUBLIC_CHAT_API_URL is not defined.");
      return NextResponse.next();
    }

    const newPath = req.nextUrl.pathname.replace("/gentle", "");
    const targetUrl = new URL(`${baseUrl}${newPath}${req.nextUrl.search || ""}`);
    console.log("Rewriting to URL:", targetUrl);

    // GET 요청으로 변환되지 않도록 메서드를 강제로 유지
    const response = NextResponse.rewrite(targetUrl);
    response.headers.set("x-original-method", originalMethod); // 요청 메서드를 명시적으로 전달
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gentle/:path*"],
};
