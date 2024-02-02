import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();

  //Check if user is logged in and if path does not start with /auth. if not redirect to /auth/login
  if (!data && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(baseUrl + "/auth/login");
  }

  return res;
}
