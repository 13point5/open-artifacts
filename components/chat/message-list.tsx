"use client";

import { Models } from "@/app/types";
import { ChatMessage } from "@/components/chat/message";
import { Separator } from "@/components/ui/separator";
import { ArtifactMessagePartData } from "@/lib/utils";
import { Message } from "ai";
import { RefObject } from "react";

type Props = {
  messages: Message[];
  setCurrentArtifact: (data: ArtifactMessagePartData) => void;
  containerRef: RefObject<HTMLDivElement>;
};

export const ChatMessageList = ({
  messages,
  setCurrentArtifact,
  containerRef,
}: Props) => {
  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col gap-4 max-w-3xl mx-auto w-full pt-1"
    >
      {messages.map((message, index) => (
        <>
          <ChatMessage
            key={index}
            role={message.role}
            model={Models.claude}
            text={message.content}
            attachments={message.experimental_attachments || []}
            setCurrentArtifact={setCurrentArtifact}
          />

          {index !== messages.length - 1 && <Separator />}
        </>
      ))}
    </div>
  );
};
