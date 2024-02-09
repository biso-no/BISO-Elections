import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kong-ts4cc4w.biso.no/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

// Access auth admin api
export const adminAuthClient = supabase.auth.admin;

export const databaseClient = supabase.schema("public");

export * from "./src";
