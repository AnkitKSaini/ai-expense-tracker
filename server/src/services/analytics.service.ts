import Expense from "../models/Expense.js";

export const getCategoryAnalyticsService = async (
  userId: string,
) => {
  const data = await Expense.aggregate([
    {
      $match: {
        user: Expense.db.base.Types.ObjectId.createFromHexString(userId),
        type: "Expense",
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

  return data;
};