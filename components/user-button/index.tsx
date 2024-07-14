"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutDialog } from "./sign-out-dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabase } from "@/lib/supabase";
import { getEmailInitials } from "@/lib/utils";

type Props = {
  expanded?: boolean;
};

export const UserButton = ({ expanded = false }: Props) => {
  const router = useRouter();

  const { supabase, session } = useSupabase();
  const email = session?.user.email;
  const userInitials = email ? getEmailInitials(email) : null;

  const [isSignoutDialogOpen, setIsSignoutDialogOpen] = useState(false);

  const handleOpenSignoutDialog = () => setIsSignoutDialogOpen(true);
  const handleCloseSignoutDialog = () => setIsSignoutDialogOpen(false);

  const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res = await supabase.auth.signOut();

      if (res.error) throw new Error(res.error.message);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error signing out");
    } finally {
      handleCloseSignoutDialog();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex items-center justify-start gap-4 px-1 h-6">
          <UserIcon className="w-6 h-6" />

          {expanded && (
            <span className="font-medium text-sm truncate">{email}</span>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleOpenSignoutDialog}
            className="cursor-pointer"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog
        open={isSignoutDialogOpen}
        onOpenChange={setIsSignoutDialogOpen}
        handleSignOut={handleSignOut}
      />
    </>
  );
};
