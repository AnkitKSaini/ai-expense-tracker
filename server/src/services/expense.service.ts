import Expense from "../models/Expense.js";

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

export const getExpensesService = async (userId: string) => {
  return await Expense.find({ user: userId }).sort({
    date: -1,
  });
};