import Expense from "../models/Expense.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

interface CreateExpenseData {
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date?: Date;
}

export const createExpenseService = async (
  data: CreateExpenseData,
  userId: string
) => {
  return await Expense.create({
    ...data,
    user: userId,
  });
};

export const getExpenseByIdService = async (
  expenseId: string,
  userId: string
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

  const expenses = await Expense.find(query)
    .sort({ date: -1 })
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
    type?: "income" | "expense";
    date?: Date;
  }
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
    }
  );
};

export const deleteExpenseService = async (
  expenseId: string,
  userId: string
) => {
  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    user: userId,
  });

  if (!expense) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Expense not found"
    );
  }

  return expense;
};