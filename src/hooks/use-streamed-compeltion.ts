import { useRef, useState } from "react";

export function useStreamedCompletion() {
  const [text, setText] = useState("");
  const controllerRef = useRef<AbortController | null>(null);

  const submitPrompt = async (prompt: string) => {
    setText("");
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    const res = await fetch("/api/completion", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controllerRef.current.signal,
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let result = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      result += decoder.decode(value, { stream: true });

      // Avoid too many re-renders
      if (result.endsWith(".") || result.endsWith("\n")) {
        setText(result);
      }
    }

    setText(result); // Final flush
  };

  return { text, submitPrompt };
}
