import { ArtifactPanel } from "@/components/artifact";
import { ChatInput } from "@/components/chat/input";
import { ChatMessageList } from "@/components/chat/message-list";
import { useState } from "react";

type ArtifactData = {
  title: string;
  code: string;
  type: string;
};

export const ChatPanel = () => {
  const [artifactData, setArtifactData] = useState<ArtifactData | null>(null);

  return (
    <>
      <div className="relative flex w-full flex-1 overflow-x-hidden overflow-y-scroll pt-6">
        <div className="relative mx-auto flex h-full w-full max-w-3xl flex-1 flex-col md:px-2">
          <ChatMessageList />
          <ChatInput />
        </div>
      </div>

      {artifactData && (
        <div className="w-full h-full flex-1 pt-6 pb-4">
          <ArtifactPanel />
        </div>
      )}
    </>
  );
};
