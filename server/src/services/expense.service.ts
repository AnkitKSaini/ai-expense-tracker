import Expense from "../models/Expense.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { createNotification } from "./notification.service.js";

interface CreateExpenseData {
  title: string;
  amount: number;
  category: string;
  type: "Income" | "Expense";
  date?: Date;
}

export const createExpenseService = async (
  data: CreateExpenseData,
  userId: string,
) => {
  const expense = await Expense.create({
    ...data,
    user: userId,
  });

  // Large Expense Alert
  if (expense.type === "Expense" && expense.amount > 50000) {
    await createNotification(
      {
        title: "Large Expense",

        message: `₹${expense.amount.toLocaleString("en-IN")} expense recorded.`,

        type: "AI",

        priority: "High",

        actionUrl: "/expenses",
      },
      userId,
    );
  }

  return expense;
};

export const getExpenseByIdService = async (
  expenseId: string,
  userId: string,
) => {
  return await Expense.findOne({
    _id: expenseId,
    user: userId,
  });
};

export const getExpensesService = async (
  userId: string,
  search: string,
  category: string,
  sort: string,
  page: number,
  limit: number,
) => {
  const query: Record<string, unknown> = {
    user: userId,
  };

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit;
  let sortOption = {};

  switch (sort) {
    case "oldest":
      sortOption = { date: 1 };
      break;

    case "amountHigh":
      sortOption = { amount: -1 };
      break;

    case "amountLow":
      sortOption = { amount: 1 };
      break;

    default:
      sortOption = { date: -1 };
  }

  const expenses = await Expense.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const total = await Expense.countDocuments(query);

  return {
    expenses,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateExpenseService = async (
  expenseId: string,
  userId: string,
  data: {
    title?: string;
    amount?: number;
    category?: string;
    type?: "Income" | "Expense";
    date?: Date;
  },
) => {
  return await Expense.findOneAndUpdate(
    {
      _id: expenseId,
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteExpenseService = async (
  expenseId: string,
  userId: string,
) => {
  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    user: userId,
  });

  if (!expense) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Expense not found");
  }

  return expense;
};

export const getCalendarExpensesService = async (
  userId: string,
  month: number,
  year: number,
) => {
  const startDate = new Date(year, month - 1, 1);

  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  return await Expense.find({
    user: userId,

    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .select("title category amount type date")
    .sort({
      date: 1,
    });
};
