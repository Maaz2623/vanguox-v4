"use client";
import { MessagesList } from "../components/messages-list";
import { MessagesForm } from "../components/messages-form";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useMemo } from "react";
import { Message } from "ai";

export const MessagesView = () => {
  const dbMessages = useQuery(api.messages.getMessages, {
    chatId: "123456",
  });

  const initialMessages = useMemo(
    () =>
      (dbMessages ?? []).map((m) => ({
        _id: m._id,
        id: m.id,
        content: m.content,
        role: m.role as Message["role"],
      })),
    [dbMessages]
  );
  if (!dbMessages) return <div>loading...</div>;

  return (
    <div className="h-screen relative">
      <MessagesList initialMessages={initialMessages} />
      <MessagesForm />
    </div>
  );
};
