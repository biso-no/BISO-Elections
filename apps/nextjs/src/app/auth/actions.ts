"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const signInWithPassword = async (email: string, password: string) => {
  const supabase = createServerActionClient({ cookies });

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
};

export const signUp = async (email: string, password: string) => {
  const supabase = createServerActionClient({ cookies });
  const origin = headers().get("origin");

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data.user;
};

export const signInWithGithub = async () => {
  const origin = headers().get("origin");
  const supabase = createServerActionClient({ cookies });

  const res = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (res.data.url) redirect(res.data.url);
  throw res.error;
};

export const signInWithEmail = async (email: string) => {
  const supabase = createServerActionClient({ cookies });
  const origin = headers().get("origin");

  const { error, data } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  return {
    user: data.user,
    error: error,
  };
};

export const signInWithAzure = async () => {
  const supabase = createServerActionClient({ cookies });
  const origin = headers().get("origin");

  const res = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (res.data.url) redirect(res.data.url);
  console.log("res.error", res.error); // TODO: remove this line
  throw res.error;
};

export const signInWithCode = async (email: string, token: string) => {
  const supabase = createServerActionClient({ cookies });
  const origin = headers().get("origin");

  const res = await supabase.auth.verifyOtp({
    email,
    token,
    type: "invite",
  });

  if (res.data.session) redirect(`${origin}/`);
  throw res.error;
};

export const signOut = async () => {
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.auth.signOut();

  return {
    error: error,
  };
};

export const getUser = async () => {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user: user,
  };
};
