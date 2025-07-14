import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    chatId: v.string(),
    id: v.string(),
    content: v.string(),
    attachments: v.optional(v.array(
      v.object({
        name: v.optional(v.string()),
        contentType: v.optional(v.string()),
        url: v.string(),
      })
    )),
    role: v.union(
      v.literal("system"),
      v.literal("user"),
      v.literal("assistant"),
      v.literal("data"),
      v.literal("tool")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      chatId: args.chatId,
      id: args.id,
      content: args.content,
      attachments: args.attachments,
      role: args.role,
    });
  }
});

export const getMessages = query({
  args: {
    chatId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
      .order("asc") // Sort by createdAt ascending (oldest → newest)
      .collect();

    return messages;
  },
});
