import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { predictGoal } from "../services/goalPrediction.service.js";

import {
  createGoalService,
  getGoalsService,
  updateGoalService,
  deleteGoalService,
} from "../services/goal.service.js";

export const createGoal = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const goal = await createGoalService(req.body, req.user!.id);

    res
      .status(201)
      .json(new ApiResponse(true, "Goal created successfully", goal));
  },
);

export const getGoals = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const goals = await getGoalsService(req.user!.id);

    res.json(new ApiResponse(true, "Goals fetched successfully", goals));
  },
);

export const updateGoal = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const goal = await updateGoalService(req.params.id, req.user!.id, req.body);

    res.json(new ApiResponse(true, "Goal updated successfully", goal));
  },
);

export const deleteGoal = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteGoalService(req.params.id, req.user!.id);

    res.json(new ApiResponse(true, "Goal deleted successfully"));
  },
);

export const predictGoalAI = asyncHandler(async (req, res) => {
  const result = await predictGoal(req.body);

  res.json({
    success: true,
    data: JSON.parse(result),
  });
});
