import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://foiyaskeyabsyzptmrqr.supabase.co",
  SUPABASE_KEY
);
