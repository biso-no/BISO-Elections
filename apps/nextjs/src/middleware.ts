import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();

  if (data.session?.user.user_metadata?.role === "admin") {
    return NextResponse.next();
  } else if (
    data.session?.user.user_metadata?.role === "election_participant" &&
    !req.nextUrl.pathname.startsWith("/vote")
  ) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL + "/vote");
  } else if (!data.session && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL + "/auth/login");
  }

  return res;
}
