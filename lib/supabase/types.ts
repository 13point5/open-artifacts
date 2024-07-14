import { Database } from "@/app/supabase.types";
import { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";

export type SupabaseContextType = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
};
