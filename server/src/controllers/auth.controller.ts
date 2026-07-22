import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  registerService,
  loginService,
  logoutService,
  getCurrentUser,
  refreshTokenService,
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
  async (req: any, res: Response) => {

    await logoutService(
      req.user.id,
    );

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

    const user =
      await getCurrentUser(
        req.user.id,
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Current user",
        user,
      ),
    );

  },
);


export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {

    const token =
      req.cookies.refreshToken;

    const result =
      await refreshTokenService(
        token,
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Access token refreshed",
        result,
      ),
    );

  },
);