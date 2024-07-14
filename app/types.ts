import { Database } from "@/app/supabase.types";
import { Message } from "ai";

export type ChatMessageRoles = Message["role"];

export enum Models {
  claude = "claude",
  gpt4o = "gpt4-o",
}

export type Chat = Database["public"]["Tables"]["chats"]["Row"];
