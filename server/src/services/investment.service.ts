import Investment from "../models/Investment.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export interface CreateInvestmentData {
  title: string;

  symbol?: string;

  type:
    | "Stock"
    | "Mutual Fund"
    | "SIP"
    | "ETF"
    | "Gold"
    | "Crypto"
    | "FD"
    | "PPF"
    | "NPS"
    | "Real Estate"
    | "Bond"
    | "Other";

  investedAmount: number;

  currentValue: number;

  quantity: number;

  purchasePrice: number;

  currentPrice: number;

  purchaseDate: Date;

  platform: string;

  currency: "INR" | "USD";

  status: "Active" | "Sold";

  riskLevel: "Low" | "Medium" | "High";

  notes?: string;

  tags?: string[];
}

// =======================
// Create
// =======================

export const createInvestmentService = async (
  data: CreateInvestmentData,
  userId: string,
) => {
  return await Investment.create({
    ...data,
    user: userId,
  });
};

// =======================
// Get By Id
// =======================

export const getInvestmentByIdService = async (
  investmentId: string,
  userId: string,
) => {
  const investment = await Investment.findOne({
    _id: investmentId,
    user: userId,
  });

  if (!investment) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Investment not found",
    );
  }

  return investment;
};

// =======================
// Get All
// =======================

export const getInvestmentsService = async (
  userId: string,
) => {
  return await Investment.find({
    user: userId,
  }).sort({
    purchaseDate: -1,
  });
};

// =======================
// Update
// =======================

export const updateInvestmentService = async (
  investmentId: string,
  userId: string,
  data: Partial<CreateInvestmentData>,
) => {
  const investment =
    await Investment.findOneAndUpdate(
      {
        _id: investmentId,
        user: userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );

  if (!investment) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Investment not found",
    );
  }

  return investment;
};

// =======================
// Delete
// =======================

export const deleteInvestmentService = async (
  investmentId: string,
  userId: string,
) => {
  const investment =
    await Investment.findOneAndDelete({
      _id: investmentId,
      user: userId,
    });

  if (!investment) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Investment not found",
    );
  }

  return investment;
};

// =======================
// Portfolio Summary
// =======================

export const getPortfolioSummaryService =
  async (userId: string) => {
    const investments =
      await Investment.find({
        user: userId,
      });

    const totalInvestment =
      investments.reduce(
        (sum, investment) =>
          sum + investment.investedAmount,
        0,
      );

    const currentValue =
      investments.reduce(
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

    return {
      totalInvestment,

      currentValue,

      totalProfit,

      roi: Number(roi.toFixed(2)),

      activeAssets:
        investments.filter(
          (item) =>
            item.status === "Active",
        ).length,
    };
  };