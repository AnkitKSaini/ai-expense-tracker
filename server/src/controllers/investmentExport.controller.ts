import type { Response } from "express";

import Investment from "../models/Investment.js";
import User from "../models/User.js";

import type { AuthRequest } from "../middleware/auth.middleware.js";

import { exportPortfolioPDF } from "../services/investment/investmentExport.service.js";

export async function exportInvestmentPDF(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const investments = await Investment.find({
      user: req.user.id,
    }).lean();

    const totalInvestment = investments.reduce(
      (sum, investment) =>
        sum + investment.investedAmount,
      0,
    );

    const currentValue = investments.reduce(
      (sum, investment) =>
        sum + investment.currentValue,
      0,
    );

    const totalProfit =
      currentValue - totalInvestment;

    const roi =
      totalInvestment === 0
        ? 0
        : (totalProfit /
            totalInvestment) *
          100;

    const pdf =
      await exportPortfolioPDF(
        {
          name: user.name,
          email: user.email,
        },
        investments,
        {
          totalInvestment,
          currentValue,
          totalProfit,
          roi,
          totalAssets:
            investments.length,
        },
      );

    res.setHeader(
      "Content-Type",
      "application/pdf",
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Portfolio-Report.pdf"',
    );

    return res.send(pdf);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to export portfolio.",
    });

  }
}