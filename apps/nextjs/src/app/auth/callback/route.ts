import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { api } from "~/trpc/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data) {
      // Check if user profile already exists in the database
      const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .eq("id", data.user?.id)
        .single();

      // If profile does not exist, create a new one
      if (!profile) {
        //Add role as metadata to the user

        const { data: newProfileData, error: newProfileError } = await supabase
          .from("profile")
          .insert([
            {
              id: data.user?.id,
              email: data.session?.user?.email ?? "na",
              name: data.session?.user?.user_metadata?.full_name ?? "na",
              user_role: "user",
              image:
                data.session?.user.user_metadata.avatar_url ??
                "https://avatars.githubusercontent.com/u/8186664?v=4",
            },
          ])
          .select();

        if (newProfileData && data.user) {
          await api.admin.changeRole({
            userId: data.user?.id,
            role: "user",
          });
        }

        console.log("New Profile Error1:", newProfileError);
        console.log("New Profile Data1:", newProfileData);

        //Update session with new profile data
        const { data: updatedSessionData, error: updatedSessionError } =
          await supabase.auth.refreshSession();

        console.log("Updated Session Erro1r:", updatedSessionError);
        console.log("Updated Session Data1:", updatedSessionData);
      }
    }
  } else if (access_token && refresh_token) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
  }

  return NextResponse.redirect(process.env.NEXT_PUBLIC_URL!);
}
