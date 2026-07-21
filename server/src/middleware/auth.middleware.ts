import type {
  Response,
  NextFunction,
} from "express";

import type { AuthRequest } from "../types/auth.types.js";

import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import User from "../models/User.js";

import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const authMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Unauthorized",
      );
    }

    
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Token not provided",
      );
    }

    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET,
    ) as unknown as {
      userId: string;
    };

    const user = await User.findById(
      decoded.userId,
    ).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "User not found",
      );
    }

    req.user = user;

    next();
  } catch {
    next(
      new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid or expired token",
      ),
    );
  }
};

export default authMiddleware;