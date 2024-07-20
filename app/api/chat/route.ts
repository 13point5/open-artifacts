import { ArtifactoSystemPrompt } from "@/app/api/chat/systemPrompt";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, Message, ImagePart } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { Models } from "@/app/types";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, apiKey, model } = await req.json();

  let llm;
  let options: Record<string, any> = {};

  if (model === Models.claude) {
    const anthropic = createAnthropic({
      apiKey,
    });

    llm = anthropic("claude-3-5-sonnet-20240620");

    options = {
      ...options,
      maxTokens: 8192,
      headers: {
        ...(options.headers || {}),
        "anthropic-beta": "max-tokens-3-5-sonnet-2024-07-15",
      },
    };
  } else if (model.startsWith("gpt")) {
    const openai = createOpenAI({
      compatibility: "strict", // strict mode, enable when using the OpenAI API
      apiKey,
    });

    llm = openai(model);
  }

  if (!llm) throw new Error(`Unsupported model: ${model}`);

  const initialMessages = messages.slice(0, -1);
  const currentMessage: Message = messages[messages.length - 1];
  const attachments = currentMessage.experimental_attachments || [];
  const imageParts: ImagePart[] = attachments.map((file) => ({
    type: "image",
    image: new URL(file.url),
  }));

  const result = await streamText({
    model: llm,
    messages: [
      ...convertToCoreMessages(initialMessages),
      {
        role: "user",
        content: [
          {
            type: "text",
            text: currentMessage.content,
          },
          ...imageParts,
        ],
      },
    ],
    system: ArtifactoSystemPrompt,
    ...options,
  });

  return result.toAIStreamResponse();
}
