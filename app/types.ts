import { Database } from "@/app/supabase.types";
import { Message } from "ai";

export type ChatMessageRoles = Message["role"];

export enum Models {
  claude = "claude",
  gpt4o = "gpt4-o",
  gpt35turbo = "gpt-3.5-turbo",
  gpt4turbo = "gpt-4-turbo",
}

export type Chat = Database["public"]["Tables"]["chats"]["Row"];

export type Attachment = {
  contentType?: string;
  url: string;
  name?: string;
};
