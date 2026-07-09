import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

export const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

console.log(
  "Gemini Loaded:",
  env.GEMINI_API_KEY ? "Yes" : "No"
);