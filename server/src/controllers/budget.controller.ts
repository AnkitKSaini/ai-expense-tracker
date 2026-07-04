import type { Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import { createBudgetService } from "../services/budget.service.js";

import {
  getBudgetService,
  updateBudgetService,
  deleteBudgetService,
} from "../services/budget.service.js";

export const createBudget = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const budget = await createBudgetService(req.body, req.user!.id);

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "Budget created successfully", budget));
  },
);

export const getBudget = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { month, year } = req.query;

    const budget = await getBudgetService(
      req.user!.id,
      Number(month),
      Number(year),
    );

    res.json(new ApiResponse(true, "Budget fetched successfully", budget));
  },
);

export const updateBudget = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const budget = await updateBudgetService(
      req.params.id,
      req.body.amount,
      req.user!.id,
    );

    res.json(new ApiResponse(true, "Budget updated successfully", budget));
  },
);

export const deleteBudget = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    await deleteBudgetService(req.params.id, req.user!.id);

    res.json(new ApiResponse(true, "Budget deleted successfully"));
  },
);
