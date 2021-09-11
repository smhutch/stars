import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://foiyaskeyabsyzptmrqr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTM4MTE5NywiZXhwIjoxOTQ2OTU3MTk3fQ.dwtNeNEKMko7xy36fEs_RgSN0uujROf1irFYJ0qTgr4"
);
