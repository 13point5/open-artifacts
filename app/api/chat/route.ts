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
  });

  return result.toAIStreamResponse();
}
