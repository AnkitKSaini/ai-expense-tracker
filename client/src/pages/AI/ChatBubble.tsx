import { useState } from "react";
import type { ChatMessage } from "../../types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot,
  User,
  Copy,
  Check,
} from "lucide-react";

interface Props {
  message: ChatMessage;
}

function ChatBubble({ message }: Props) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
          <Bot size={20} />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 shadow transition-all duration-300 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        }`}
      >
        {/* Sender */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold opacity-70">
            {isUser ? "You" : "AI Assistant"}
          </span>

          <span className="text-[11px] opacity-60">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Message */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Copy Button */}
        {!isUser && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={copyMessage}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg dark:bg-gray-600">
          <User size={20} />
        </div>
      )}
    </div>
  );
}

export default ChatBubble;