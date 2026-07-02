import mongoose from "mongoose";
import Expense from "../models/Expense.js";

export const getDashboardSummary = async (
  userId: string
) => {
  // Convert string userId to ObjectId once
  const userObjectId = new mongoose.Types.ObjectId(userId);

  // All Expenses
  const expenses = await Expense.find({
    user: userObjectId,
  });

  // Recent Transactions
  const recentTransactions = await Expense.find({
    user: userObjectId,
  })
    .sort({
      date: -1,
    })
    .limit(5);

  // Category Wise Expense
  const categoryWiseExpense = await Expense.aggregate([
    {
      $match: {
        user: userObjectId,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: 1,
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
  ]);

  // Monthly Expense
  const monthlyExpense = await Expense.aggregate([
    {
      $match: {
        user: userObjectId,
        type: "expense",
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$date",
          },
        },
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        total: 1,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  // Summary
  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = expenses
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return {
  balance,
  totalIncome,
  totalExpense,
  totalTransactions: expenses.length,
  recentTransactions,
  categoryWiseExpense,
  monthlyExpense,
};
};