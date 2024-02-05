import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  // Bypass middleware for Next.js internal requests
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();

  const role = data?.session?.user.user_metadata?.role;

  // Redirect to login if there is no session and the request is not for the auth pages
  if (!data.session && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth/login`);
  }

  // Redirect non-admin users with a session to the vote page, unless they are already there
  if (
    data?.session &&
    role !== "admin" &&
    !req.nextUrl.pathname.startsWith("/vote")
  ) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/vote`);
  }

  // Admin users and requests to auth pages pass through
  return res;
}
