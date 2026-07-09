import { useEffect, useState } from "react";
import type { ChatMessage } from "../types/chat";

const STORAGE_KEY = "ai-financial-chat";

export function useChatHistory() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );
  }, [messages]);

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY);

    setMessages([]);
  };

  return {
    messages,
    setMessages,
    clearChat,
  };
}