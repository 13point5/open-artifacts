import { Database } from "@/app/supabase.types";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const useSupabaseServerClient = () => {
  const { getToken } = auth();

  const getClient = async () => {
    const token = await getToken({ template: "supabase" });
    if (!token) throw new Error("Clerk token not found");

    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );
  };

  return { getClient };
};
