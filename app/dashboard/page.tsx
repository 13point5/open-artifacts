"use client";

import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@/lib/hooks/useSupabaseClient";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

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

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <SignOutButton />
      <Button onClick={createChat}>Create chat</Button>
    </div>
  );
}
