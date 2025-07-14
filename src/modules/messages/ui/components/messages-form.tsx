import { Message, useChat } from "@ai-sdk/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import TextAreaAutoSize from "react-textarea-autosize";
import { ArrowUpIcon } from "lucide-react";
import "highlight.js/styles/atom-one-dark.css"; // or any other theme like atom-one-dark
import { Button } from "@/components/ui/button";
import React from "react";

export const MessagesForm = () => {
  const createMessage = useMutation(api.messages.create);

  const rawMessages = useQuery(api.messages.getMessages, {
    chatId: "123456",
  });

  // Convert Convex messages to your Message type
  const convertedMessages: Message[] = (rawMessages ?? []).map((m) => ({
    id: m.id,
    content: m.content,
    role: m.role as Message["role"],
  }));

  const { input, handleInputChange, setInput, handleSubmit } = useChat({
    id: "123456",
    initialMessages: convertedMessages,
    sendExtraMessageFields: true,
    api: "/api/chat",
    streamProtocol: "data",
  });

  const onSubmit = async () => {
    try {
      await createMessage({
        chatId: "123456",
        content: input,
        role: "user",
        id: "123456",
      });
      handleSubmit();
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-2 md:bottom-3 w-full">
      <div className="rounded-lg w-[98%] lg:w-3/4 mx-auto bg-neutral-200 dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-300 overflow-hidden p-2">
        <form onSubmit={onSubmit}>
          <TextAreaAutoSize
            minRows={1}
            rows={1}
            value={input}
            onChange={handleInputChange}
            maxRows={1}
            className="px-3 py-3 resize-none text-sm border-none w-full outline-none bg-transparent"
            placeholder="What would you like to build?"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) {
                  // Allow newline (default behavior)
                  return;
                } else {
                  e.preventDefault();
                  if (e.ctrlKey || !e.metaKey) {
                    onSubmit();
                  }
                }
              }
            }}
          />

          <div className="h-8 flex justify-between items-center">
            <div />
            <Button size={`icon`} type="submit">
              <ArrowUpIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
