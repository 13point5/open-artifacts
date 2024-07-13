import { ChatMessageRoles, Models } from "@/app/types";
import Markdown from "@/components/markdown/markdown";

const getDisplayNameFromRole = (
  role: ChatMessageRoles,
  model: Models | null
) => {
  if (role === ChatMessageRoles.user) return "Me";

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
  return (
    <div
      className={`flex flex-col gap-1 px-2 py-1 rounded-md ${
        role === ChatMessageRoles.user ? "bg-[#F4F4F4]" : "bg-white"
      }`}
    >
      <span className="font-semibold text-sm">
        {getDisplayNameFromRole(role, model)}
      </span>

      <Markdown text={text} />
    </div>
  );
};
