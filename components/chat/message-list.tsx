import { ChatMessageRoles, Models } from "@/app/types";
import { ChatMessage } from "@/components/chat/message";

const generateMessages = (count: number) => {
  return Array.from({ length: count }).map((_, index) => ({
    role: index % 2 === 0 ? ChatMessageRoles.human : ChatMessageRoles.ai,
    model: index % 2 === 0 ? null : Models.claude,
    text: "Hello whats up",
  }));
};

export const ChatMessageList = () => {
  const messages = generateMessages(20);
  return (
    <div className="flex-1 flex flex-col gap-3 px-4 max-w-3xl mx-auto w-full pt-1">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          model={message.model}
          text={message.text}
        />
      ))}
    </div>
  );
};
