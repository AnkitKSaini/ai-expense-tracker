import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { env } from "../config/env.js";

export default function generateAccessToken(userId: string) {
  return jwt.sign(
    { userId },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES as StringValue,
    }
  );
}