import type { Request } from "express";

export interface JwtPayload {
  id: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

