import type { Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import  { getDashboardSummary  } from "../services/dashboard.service.js";

export const getDashboard = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const dashboard = await getDashboardSummary(req.user.id);

    res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        true,
        "Dashboard fetched successfully",
        dashboard
      )
    );
  }
);