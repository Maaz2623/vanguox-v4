"use client";

import { useCompletion } from "@ai-sdk/react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Page() {
  const createMessage = useMutation(api.messages.create);

  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: "/api/completion",
    onFinish: async (prompt, completion) => {
      createMessage({
        chatId: "123456",
        content: prompt,
        type: "result",
        role: "user",
      }).then(() => {
        createMessage({
          chatId: "123456",
          content: completion,
          type: "result",
          role: "assistant",
        });
      });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
      <div>{completion}</div>
    </form>
  );
}
