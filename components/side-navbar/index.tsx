"use client";

import { ChatItem } from "@/components/side-navbar/chat-item";
import { UserSettings } from "@/components/side-navbar/user-settings";
import { Button } from "@/components/ui/button";
import { getChats } from "@/lib/db";
import { useSupabaseClient } from "@/lib/hooks/useSupabaseClient";
import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, SidebarIcon, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export const SideNavBar = () => {
  const [open, setOpen] = useState(false);

  const params = useParams();
  console.log("params.id", params.id);

  const { userId } = useAuth();
  const { getClient } = useSupabaseClient();

  const {
    data: chats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(getClient, userId),
    enabled: !!userId,
  });
  console.log("chats", chats);

  if (open) {
    return (
      <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-4 justify-between px-2 py-2 pb-4 bg-slate-50 w-[200px]">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-lg font-semibold text-center">
            Open Artifacts
          </Link>

          <div className="flex items-center justify-between gap-2">
            <Button onClick={() => setOpen(false)} size="icon" variant="ghost">
              <SidebarIcon className="w-4 h-4" />
            </Button>

            <Link href="/new">
              <Button size="icon" variant="ghost">
                <SquarePenIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2 overflow-hidden">
          <span className="font-medium">Chats</span>
          {chats && (
            <div className="flex flex-col flex-1 gap-2 overflow-auto">
              {chats.map((item, index) => (
                <ChatItem
                  key={index}
                  id={item.id}
                  title={item.title}
                  selected={item.id === params.id}
                />
              ))}
            </div>
          )}

          {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
          {error && <p className="text-red-500">Could not fetch chats</p>}
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <UserSettings showLabel />

          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: {
                  flexDirection: "row-reverse",
                },
                userButtonOuterIdentifier: {
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
                userButtonTrigger: {
                  padding: "0 4px",
                },
                avatarBox: {
                  width: "24px",
                  height: "24px",
                },
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen flex flex-col gap-2 justify-between px-2 py-2 pb-4 items-center">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-lg font-semibold text-center">
          OA
        </Link>

        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
            <SidebarIcon className="w-4 h-4" />
          </Button>

          <Link href="/new">
            <Button size="icon" variant="ghost">
              <SquarePenIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <UserSettings />

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "24px",
                  height: "24px",
                },
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
};

const generateChats = (count: number) =>
  Array.from({ length: count }).map((_, index) => ({
    selected: index === 0,
    title: `${index} Blalalalalallalalalallabbababababab`,
  }));