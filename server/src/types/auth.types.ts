import type { Request } from "express";
import type { HydratedDocument } from "mongoose";

import type { IUser } from "../models/User.js";

export interface AuthRequest extends Request {
  user: HydratedDocument<IUser>;
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

export interface JwtPayload {
  userId: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}