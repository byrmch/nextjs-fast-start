import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ErrorCode, ErrorMsg } from "@/core/response/errors";
import { fail } from "@/core/response";

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};

const PUBLIC_PREFIXES = [
  "/api/auth/",
  "/api/health",
  "/_next",
  "/favicon.ico",
  "/",
];

export default async function proxy(request: NextRequest) {
  const { method } = request;
  const { pathname } = request.nextUrl;
  const start = Date.now();

  const isPublic = PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))
    || pathname === "/";

  if (!isPublic && pathname.startsWith("/api/")) {
    const res = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      { headers: { cookie: request.headers.get("cookie") || "" } },
    );
    const session = await res.json();

    if (!session?.data?.user) {
      return NextResponse.json(
        fail(ErrorMsg[ErrorCode.UNAUTHORIZED], ErrorCode.UNAUTHORIZED),
        { status: 401 },
      );
    }
  }

  const response = NextResponse.next();

  const elapsed = Date.now() - start;
  if (process.env.NODE_ENV !== "production") {
    const url = `${method} ${pathname}`;
    response.headers.set("X-Response-Time", `${elapsed}ms`);
    console.log(`[req] ${url} — ${elapsed}ms`);
  }

  return response;
}
