import { ChatMessageRoles, Models } from "@/app/types";
import Markdown from "@/components/markdown/markdown";
import { Button } from "@/components/ui/button";
import { MessagePart as MessagePartType, parseMessage } from "@/lib/utils";
import { CodeIcon, Loader2Icon } from "lucide-react";

const getDisplayNameFromRole = (
  role: ChatMessageRoles,
  model: Models | null
) => {
  if (role === "user") return "Me";

  switch (model) {
    case Models.claude:
      return "Claude";

    case Models.gpt4o:
      return "GPT 4o";

    default:
      return model;
  }
};

type Props = {
  role: ChatMessageRoles;
  model: Models | null;
  text: string;
};

export const ChatMessage = ({ role, model, text }: Props) => {
  const parts = parseMessage(text);

  return (
    <div
      className={`flex flex-col gap-1 px-2 py-1 rounded-md ${
        role === "user" ? "bg-[#F4F4F4]" : "bg-white"
      }`}
    >
      <span className="font-semibold text-sm">
        {getDisplayNameFromRole(role, model)}
      </span>

      {parts.map((part, index) => (
        <MessagePart data={part} key={index} />
      ))}
    </div>
  );
};

const MessagePart = ({ data }: { data: MessagePartType }) => {
  if (data.type === "text") return <Markdown text={data.data} />;

  if (data.type === "artifact")
    return (
      <Button
        variant="outline"
        className="flex justify-start h-fit w-fit py-0 px-0 my-2"
      >
        <div className="w-14 h-full flex items-center justify-center border-r">
          {data.data.generating ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <CodeIcon />
          )}
        </div>

        <div className="flex flex-col gap-0.5 items-start px-4 py-3">
          <span className="break-words text-md font-semibold leading-tight">
            {data.data?.title || "Generating"}
          </span>
          <span className="text-text-400 line-clamp-1 text-xs">
            {data.data?.content ? "Click to show code" : ""}
          </span>
        </div>
      </Button>
    );

  return null;
};
