import type { Request, Response } from "express";
import { getCategoryAnalyticsService } from "../services/analytics.service.js";

export const getCategoryAnalytics = async (
  req: Request,
  res: Response,
) => {
  const data = await getCategoryAnalyticsService(
    req.user!.id,
  );

  res.status(200).json({
    success: true,
    data,
  });
};