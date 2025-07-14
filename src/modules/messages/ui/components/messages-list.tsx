import { ScrollArea } from "@/components/ui/scroll-area";
import { MessagesCard } from "./message-card";
import { useEffect, useRef } from "react";
import { Message } from "ai";
import { useChat } from "@ai-sdk/react";
import { MessageGenerating } from "./message-generating";

interface Props {
  initialMessages: Message[];
}

export const MessagesList = ({ initialMessages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, status } = useChat({
    id: "123456",
    initialMessages,
    sendExtraMessageFields: true,
    api: "/api/chat",
    streamProtocol: "data",
  });

  console.log("messages list rendered");

  const lastIndex = messages.length - 1;
  const streamingMessage =
    messages[lastIndex]?.role === "assistant" && status === "streaming"
      ? messages[lastIndex]
      : null;

  const stableMessages = streamingMessage ? messages.slice(0, -1) : messages;

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "user";

  useEffect(() => {
    if (isLastMessageUser || status === "submitted") {
      const frame = requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      return () => cancelAnimationFrame(frame);
    }

    if (!messages || messages.length === 0) return;

    if (status === "streaming") {
      return;
    }
  }, [messages.length, messages, status, isLastMessageUser]); // only when a new message is added

  if (!messages) return <div>loading...</div>;

  return (
    <ScrollArea className="h-[550px] border">
      <div className="h-full w-3/4 mx-auto">
        {stableMessages.map((message, i) => (
          <MessagesCard
            key={i}
            id={message.id}
            content={message.content}
            role={message.role}
          />
        ))}

        {streamingMessage && (
          <MessagesCard
            key={streamingMessage.id}
            id={streamingMessage.id}
            content={streamingMessage.content}
            role={streamingMessage.role}
          />
        )}
        {status === "submitted" && <MessageGenerating />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
