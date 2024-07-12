"use client";

import { ChatPanel } from "@/components/chat/panel";
import { SideNavBar } from "@/components/side-navbar";
import { useSupabaseClient } from "@/lib/hooks/useSupabaseClient";
import { useAuth } from "@clerk/nextjs";

export default function Chat() {
  const { userId } = useAuth();
  const { getClient } = useSupabaseClient();

  const fetchChats = async () => {
    const dbClient = await getClient();
    const { data, error } = await dbClient.from("chats").select("*");
    console.log("data, error", data, error);
  };

  const createChat = async () => {
    const dbClient = await getClient();
    const { data, error } = await dbClient.from("chats").insert({
      title: "Bla",
      user_id: userId,
    });
    console.log("data, error", data, error);
  };

  return (
    <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden px-2 pl-0">
      <SideNavBar />

      <ChatPanel />
    </div>
  );
}
