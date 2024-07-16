import { claudeSystemPrompt } from "@/app/api/chat/systemPrompt";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, apiKey } = await req.json();

  const anthropic = createAnthropic({
    apiKey,
  });

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    messages,
    system: claudeSystemPrompt,
    maxTokens: 8192,
    headers: {
      "anthropic-beta": "max-tokens-3-5-sonnet-2024-07-15",
    },
  });

  return result.toAIStreamResponse();
}
