"use client";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

import { SupabaseContextType } from "./types";

export const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export const SupabaseProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}): JSX.Element => {
  const [supabase] = useState(() => createClientComponentClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
};
