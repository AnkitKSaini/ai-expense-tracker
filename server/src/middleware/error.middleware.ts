import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

console.error("========== ERROR ==========");
console.error(err);
console.error(err.stack);
console.error("===========================");

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;