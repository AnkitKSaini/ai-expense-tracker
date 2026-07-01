import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request<{ id: string }> {
  user?: {
    id: string;
  };
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(token, secret);

    // Type guard
    if (typeof decoded === "string" || !("id" in decoded)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.user = {
      id: decoded.id as string,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;
