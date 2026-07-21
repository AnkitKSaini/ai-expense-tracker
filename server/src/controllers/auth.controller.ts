import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  registerService,
  loginService,
} from "../services/auth.service.js";

import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../utils/cookie.js";

export const register = asyncHandler(
  async (req: Request, res: Response) => {

    const result = await registerService(req.body);

    setRefreshTokenCookie(
      res,
      result.refreshToken,
    );

    res.status(201).json(
      new ApiResponse(
        true,
        "Registration successful",
        result,
      ),
    );
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {

    const result = await loginService(req.body);

    setRefreshTokenCookie(
      res,
      result.refreshToken,
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Login successful",
        result,
      ),
    );
  },
);

export const logout = asyncHandler(
  async (_req: Request, res: Response) => {

    clearRefreshTokenCookie(res);

    res.status(200).json(
      new ApiResponse(
        true,
        "Logout successful",
        null,
      ),
    );
  },
);

export const me = asyncHandler(
  async (req: any, res: Response) => {

    res.status(200).json(
      new ApiResponse(
        true,
        "Current user",
        req.user,
      ),
    );
  },
);