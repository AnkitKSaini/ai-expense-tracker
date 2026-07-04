import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  registerService,
  loginService,
} from "../services/auth.service.js";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await registerService(req.body);
     
    res
      .status(201)
      .json(
        new ApiResponse(
          true,
          "User registered successfully",
          user
        )
      );
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await loginService(req.body);

    res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Login successful",
          result
        )
      );
  }
);