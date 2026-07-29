import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "production",

  PORT: Number(process.env.PORT || 5000),

  // ✅ NEW
  CLIENT_URL: getEnv("CLIENT_URL"),

  MONGODB_URI: getEnv("MONGODB_URI"),

  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),

  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),

  JWT_PASSWORD_RESET_SECRET: getEnv("JWT_PASSWORD_RESET_SECRET"),

  ACCESS_TOKEN_EXPIRES: (process.env.ACCESS_TOKEN_EXPIRES ||
    "15m") as SignOptions["expiresIn"],

  REFRESH_TOKEN_EXPIRES: (process.env.REFRESH_TOKEN_EXPIRES ||
    "7d") as SignOptions["expiresIn"],

  PASSWORD_RESET_TOKEN_EXPIRES: (process.env.PASSWORD_RESET_TOKEN_EXPIRES ||
    "15m") as SignOptions["expiresIn"],

  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),

  MAIL_HOST: getEnv("MAIL_HOST"),
  MAIL_PORT: Number(getEnv("MAIL_PORT")), // ✅ Number
  MAIL_USER: getEnv("MAIL_USER"),
  MAIL_PASS: getEnv("MAIL_PASS"),
  MAIL_FROM: getEnv("MAIL_FROM"),
};