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
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT || 5000),

  MONGODB_URI: getEnv("MONGODB_URI"),

  JWT_ACCESS_SECRET: getEnv("JWT_ACCESS_SECRET"),

  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),

  ACCESS_TOKEN_EXPIRES:
    (process.env.ACCESS_TOKEN_EXPIRES || "15m") as SignOptions["expiresIn"],

  REFRESH_TOKEN_EXPIRES:
    (process.env.REFRESH_TOKEN_EXPIRES || "7d") as SignOptions["expiresIn"],

  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),
};