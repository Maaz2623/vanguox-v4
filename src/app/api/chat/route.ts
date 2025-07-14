import { google } from "@ai-sdk/google";
import { smoothStream, streamText } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { tools } from "@/ai/tools";


const convex = new ConvexHttpClient(
  "https://wonderful-barracuda-588.convex.cloud"
);

export async function POST(req: NextRequest) {
  const { messages, id } = await req.json();

  const result = await streamText({
    model: google("gemini-2.0-flash"),
    messages,
    tools,
    experimental_transform: smoothStream({
      delayInMs: 30,
      chunking: "word"
    }),
    async onFinish({ response }) {
      // const fullMessages = appendResponseMessages({
      //   messages,
      //   responseMessages: response.messages,
      // });

      for (const message of response.messages) {
  await convex.mutation(api.messages.create, {
    chatId: id ?? "default-chat-id",
    id: message.id ?? crypto.randomUUID(),
    content:
  typeof message.content === "string"
    ? message.content
    : message.content.map((part) => {
        if (part.type === "text") return part.text;
        if (part.type === "file") return "[File uploaded]";
        return "";
      }).join(" "),
    role: message.role,
  });
}

    },
  });

  return result.toDataStreamResponse(); // ✅ stream back to client
}
