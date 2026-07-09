import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";

import ChatBubble from "../AI/ChatBubble";
import ChatInput from "../AI/ChatInput";
import SuggestedQuestions from "../AI/SuggestedQuestions";

import { chatWithAI } from "../../services/aiChat.service";
import { useChatHistory } from "../../hooks/useChatHistory";
import type { ChatMessage } from "../../types/chat";

function AIChat() {
  const { messages, setMessages, clearChat } = useChatHistory();

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "👋 Hello! I'm your AI Financial Advisor.\n\nI can help you with:\n\n• Budget Planning\n• Expense Analysis\n• Saving Tips\n• Investment Guidance\n• Financial Forecast",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }, [messages.length, setMessages]);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (question: string) => {
    if (!question.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const answer = await chatWithAI(question, messages.slice(-10));
      
      const aiMessage: ChatMessage = {
        id: `${Date.now()}-ai`,
        role: "assistant",
        content: answer,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          content:
            "❌ Sorry, I couldn't generate a response. Please try again.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    clearChat();

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "👋 Hello! I'm your AI Financial Advisor.\n\nAsk me anything about your finances.",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-100px)] max-w-6xl flex-col rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-blue-600 p-3 text-white">
            <Bot size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold dark:text-white">
              AI Financial Assistant
            </h1>

            <p className="text-sm text-gray-500">
              Ask anything about your finances.
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="rounded-lg border px-4 py-2 text-sm transition hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:hover:bg-red-900/20"
        >
          🗑 Clear Chat
        </button>
      </div>

      {/* Suggested Questions */}
      <div className="border-b p-6 dark:border-gray-700">
        <SuggestedQuestions onSelect={sendMessage} />
      </div>

      {/* Chat */}
      <div className="flex-1 space-y-5 overflow-y-auto p-6">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot size={18} />
            </div>

            <div className="rounded-2xl bg-gray-200 px-5 py-4 dark:bg-gray-800">
              <div className="flex gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0.2s]"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-6 dark:border-gray-700">
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
}

export default AIChat;
