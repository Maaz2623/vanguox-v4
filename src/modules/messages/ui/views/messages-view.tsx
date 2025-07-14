"use client";
import { MessagesList } from "../components/messages-list";
import { MessagesForm } from "../components/messages-form";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useMemo } from "react";
import { Message } from "ai";
import { MessagesListLoading } from "../components/messages-list-loading";
import { SiteHeader } from "@/modules/chat/ui/components/site-header";

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

  return (
    <div className="h-screen relative">
      <div className="">
        <SiteHeader />
        {!dbMessages ? (
          <MessagesListLoading />
        ) : (
          <MessagesList initialMessages={initialMessages} />
        )}
      </div>
      <MessagesForm />
    </div>
  );
};
