"use client";

import { ArtifactPanel } from "@/components/artifact";
import { ChatInput } from "@/components/chat/input";
import { ChatMessageList } from "@/components/chat/message-list";
import { useEffect, useState } from "react";
import { Message, useChat } from "ai/react";
import { getSettings } from "@/lib/userSettings";
import { addMessage, createChat, getChatMessages } from "@/lib/db";
import { Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase";
import { Chat } from "@/app/types";
import { ArtifactMessagePartData } from "@/lib/utils";

type ArtifactData = {
  title: string;
  code: string;
  type: string;
};

type Props = {
  id: string | null;
};

export const ChatPanel = ({ id }: Props) => {
  const settings = getSettings();
  const { supabase, session } = useSupabase();
  const queryClient = useQueryClient();

  const [chatId, setChatId] = useState(id);

  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [queuedMessages, setQueuedMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [currentArtifact, setCurrentArtifact] =
    useState<ArtifactMessagePartData | null>(null);

  const fetchMessages = async () => {
    if (chatId) {
      setFetchingMessages(true);

      const messages = await getChatMessages(supabase, chatId);

      setInitialMessages(
        messages.map((message) => ({
          id: String(message.id),
          role: message.role as Message["role"],
          content: message.text,
        }))
      );

      setFetchingMessages(false);
    } else {
      setInitialMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const createChatMutation = useMutation({
    mutationFn: async (title: string) =>
      await createChat(supabase, title, session?.user.id),
    onSuccess: (newChat) => {
      // Update the cache with the new chat
      queryClient.setQueryData<Chat[]>(["chats"], (oldChats) => {
        return [...(oldChats || []), newChat];
      });

      window.history.replaceState({}, "", `/chat/${newChat.id}`);

      setChatId(newChat.id);
    },
  });

  const {
    messages,
    input,
    setInput,
    append,
    isLoading: generatingResponse,
  } = useChat({
    initialMessages,
    body: {
      apiKey: settings.claudeApiKey,
    },
    onFinish: async (message) => {
      if (chatId) {
        await addMessage(supabase, chatId, message);
      } else {
        setQueuedMessages((prev) => [...prev, message]);
      }
    },
  });

  useEffect(() => {
    if (!chatId && messages.length === 1) {
      createChatMutation.mutate(messages[0].content.slice(0, 100));
    }
  }, [messages, chatId]);

  useEffect(() => {
    const sendQueuedMessages = async () => {
      if (chatId && queuedMessages.length > 0) {
        for (const message of queuedMessages) {
          await addMessage(supabase, chatId, message);
        }
        setQueuedMessages([]);
      }
    };
    sendQueuedMessages();
  }, [chatId, queuedMessages]);

  const handleSend = async () => {
    if (input.trim()) {
      const message = { role: "user", content: input };
      append({ role: "user", content: input });
      setInput("");
      if (chatId) {
        await addMessage(supabase, chatId, message);
      } else {
        setQueuedMessages((prev) => [...prev, message]);
      }
    }
  };

  return (
    <>
      <div className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll pt-6">
        <div className="relative mx-auto flex h-full w-full min-w-[400px] max-w-3xl flex-1 flex-col md:px-2">
          {fetchingMessages && <Loader2Icon className="animate-spin mx-auto" />}
          <ChatMessageList
            messages={messages}
            setCurrentArtifact={setCurrentArtifact}
          />
          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSend}
            isLoading={generatingResponse}
          />
        </div>
      </div>

      {currentArtifact && (
        <div className="w-full max-w-3xl h-full flex-1 pt-6 pb-4">
          <ArtifactPanel
            title={currentArtifact.title}
            id={currentArtifact.id}
            type={currentArtifact.type}
            generating={currentArtifact.generating}
            content={currentArtifact.content}
            onClose={() => setCurrentArtifact(null)}
          />
        </div>
      )}
    </>
  );
};
