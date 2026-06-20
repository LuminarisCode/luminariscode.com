import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const LOGIN = "/admin/login";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === LOGIN) return NextResponse.next();

  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.redirect(new URL(LOGIN, req.url));

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(LOGIN, req.url));
  }
}

export const config = { matcher: ["/admin/:path*"] };
