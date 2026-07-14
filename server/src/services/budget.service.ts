import Budget from "../models/Budget.js";
import type { CreateBudgetDto } from "../types/budget.types.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { createNotification } from "./notification.service.js";

export const createBudgetService = async (
  data: CreateBudgetDto,
  userId: string,
) => {
  const existingBudget = await Budget.findOne({
    user: userId,
    month: data.month,
    year: data.year,
  });

  if (existingBudget) {
    existingBudget.amount = data.amount;

    await existingBudget.save();

    return existingBudget;
  }

  return await Budget.create({
    ...data,
    user: userId,
  });
};

export const getBudgetService = async (
  userId: string,
  month: number,
  year: number,
) => {
  return await Budget.findOne({
    user: userId,
    month,
    year,
  });
};

export const updateBudgetService = async (
  budgetId: string,
  amount: number,
  userId: string,
) => {
  const budget = await Budget.findOneAndUpdate(
    {
      _id: budgetId,
      user: userId,
    },
    {
      amount,
    },
    {
      new: true,
    },
  );

  if (!budget) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Budget not found",
    );
  }

  await createNotification(
    {
      title: "Budget Updated",

      message: "Your monthly budget has been updated.",

      type: "Budget",

      priority: "Low",

      actionUrl: "/budget",
    },
    userId,
  );

  return budget;
};

export const deleteBudgetService = async (budgetId: string, userId: string) => {
  return await Budget.findOneAndDelete({
    _id: budgetId,
    user: userId,
  });
};
