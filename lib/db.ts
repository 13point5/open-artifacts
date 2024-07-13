import { Database } from "@/app/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";

type GetClient = () => Promise<SupabaseClient<Database>>;

export const getChats = async (
  getClient: GetClient,
  userId: string | null | undefined
) => {
  if (!userId) throw new Error("User not authenticated");

  const dbClient = await getClient();

  const { data, error } = await dbClient
    .from("chats")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const getChatMessages = async (
  getClient: GetClient,
  id: string | null
) => {
  if (!id) return [];

  const dbClient = await getClient();

  const { data, error } = await dbClient
    .from("messages")
    .select("*")
    .eq("chat_id", id)
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const createChat = async (
  getClient: GetClient,
  title: string,
  userId: string | null | undefined
) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const dbClient = await getClient();

  const { data, error } = await dbClient
    .from("chats")
    .insert({
      title,
      user_id: userId,
    })
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Could not create chat");
  }

  return data[0];
};

export const addMessage = async (
  getClient: GetClient,
  chatId: string | null,
  message: { role: string; content: string }
) => {
  console.log("addmessage chatId", chatId);
  if (!chatId) return message;

  console.log("addmessage message", message);

  const dbClient = await getClient();

  const { error } = await dbClient.from("messages").insert({
    chat_id: chatId,
    role: message.role,
    text: message.content,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return message;
};
