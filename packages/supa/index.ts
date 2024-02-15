import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kong-ts4cc4w.biso.no/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE",
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
