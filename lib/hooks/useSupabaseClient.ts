import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  const { getToken } = useAuth();

  const getClient = async () => {
    const token = await getToken({ template: "supabase" });
    if (!token) throw new Error("Clerk token not found");

    return createClient(
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
