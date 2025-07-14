import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Attachments (optional)
const Attachment = v.object({
  name: v.optional(v.string()),
  contentType: v.optional(v.string()),
  url: v.string(),
});


// Final schema
export default defineSchema({
  messages: defineTable({
    chatId: v.string(),
    id: v.string(),
    content: v.string(),
    attachments: v.optional(v.array(Attachment)),
    role: v.union(v.literal("system"), v.literal("user"), v.literal
  ("assistant"), v.literal("data"), v.literal("tool") )// 👈 Add this)
  }).index("by_chatId", ["chatId"])
});
