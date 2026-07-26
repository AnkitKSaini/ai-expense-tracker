import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

import { env } from "../config/env.js";

export default function generatePasswordResetToken(
  userId: string,
) {
  return jwt.sign(
    { userId },
    env.JWT_PASSWORD_RESET_SECRET,
    {
      expiresIn:
        env.PASSWORD_RESET_TOKEN_EXPIRES as StringValue,
    },
  );
}