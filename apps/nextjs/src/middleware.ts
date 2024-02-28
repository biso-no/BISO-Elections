import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  //These routes are public for anyone. Required for the application to work properly
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/logos") ||
    req.nextUrl.pathname.startsWith("/tmpl")
  ) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();

  //Here are our conditions for the middleware. If the user is an admin, they can access any page. If the user is an election participant, they can only access the /vote page. If the user is not logged in, they can only access the /auth route, including callback.
  if (data.session?.user.app_metadata?.roles.includes("admin")) {
    return NextResponse.next();
  } else if (
    data.session?.user.app_metadata?.roles.includes("user") &&
    !req.nextUrl.pathname.startsWith("/vote")
  ) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL + "/vote");
  } else if (!data.session && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL + "/auth/login");
  }

  return res;
}
