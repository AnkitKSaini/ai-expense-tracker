import api from "../api/api";
import type { ChatMessage } from "../types/chat";

export async function chatWithAI(
  question: string,
  history: ChatMessage[],
) {
  const response = await api.post("/ai/chat", {
    question,
    history: history.map((item) => ({
      role: item.role,
      content: item.content,
    })),
  });

  return response.data.answer;
}