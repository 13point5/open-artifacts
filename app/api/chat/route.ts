import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    messages,
    onFinish: async (event) => {
      console.log("event", event);
    },
  });

  return result.toAIStreamResponse();
}
