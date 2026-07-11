import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createInvestmentService,
  getInvestmentsService,
  getInvestmentByIdService,
  updateInvestmentService,
  deleteInvestmentService,
  getPortfolioSummaryService,
} from "../services/investment.service.js";

// =======================
// Create Investment
// =======================

export const createInvestment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const investment =
      await createInvestmentService(
        req.body,
        req.user!.id,
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Investment created successfully",
        investment,
      ),
    );
  },
);

// =======================
// Get All Investments
// =======================

export const getInvestments = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const investments =
      await getInvestmentsService(
        req.user!.id,
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Investments fetched successfully",
        investments,
      ),
    );
  },
);

// =======================
// Get Investment By ID
// =======================

export const getInvestmentById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const investment =
      await getInvestmentByIdService(
        req.params.id!,
        req.user!.id,
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Investment fetched successfully",
        investment,
      ),
    );
  },
);

// =======================
// Update Investment
// =======================

export const updateInvestment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const investment =
      await updateInvestmentService(
        req.params.id!,
        req.user!.id,
        req.body,
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Investment updated successfully",
        investment,
      ),
    );
  },
);

// =======================
// Delete Investment
// =======================

export const deleteInvestment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteInvestmentService(
      req.params.id!,
      req.user!.id,
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Investment deleted successfully",
      ),
    );
  },
);

// =======================
// Portfolio Summary
// =======================

export const getPortfolioSummary = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const summary =
      await getPortfolioSummaryService(
        req.user!.id,
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Portfolio summary fetched successfully",
        summary,
      ),
    );
  },
);