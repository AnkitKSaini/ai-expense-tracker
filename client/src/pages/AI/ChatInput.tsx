import { useEffect, useState } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
}

function ChatInput({
  onSend,
  loading,
}: Props) {
  const [text, setText] = useState("");

  const {
    listening,
    startListening,
    stopListening,
  } = useSpeechRecognition((voiceText) => {
    setText(voiceText);
  });

  useEffect(() => {
    if (!listening && text.trim()) {
      onSend(text);
      setText("");
    }
  }, [listening]);

  const send = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="flex items-center gap-3">
      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Ask AI about your finances..."
        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
      />

      <button
        onClick={() => {
          if (listening) {
            stopListening();
          } else {
            startListening();
          }
        }}
        className={`rounded-xl p-3 transition ${
          listening
            ? "bg-red-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
        }`}
      >
        {listening ? (
          <MicOff size={20} />
        ) : (
          <Mic size={20} />
        )}
      </button>

      <button
        disabled={loading}
        onClick={send}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        <Send size={18} />
        Send
      </button>
    </div>
  );
}

export default ChatInput;