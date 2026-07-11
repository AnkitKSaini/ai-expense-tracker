import Goal from "../models/Goal.js";
import type { CreateGoalDto } from "../types/goal.types.js";

export const createGoalService = async (
  data: CreateGoalDto,
  userId: string,
) => {
  return Goal.create({
    ...data,
    user: userId,
  });
};

export const getGoalsService = async (userId: string) => {
  return Goal.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

export const updateGoalService = async (
  goalId: string,
  userId: string,
  data: {
    title?: string;
    targetAmount?: number;
    savedAmount?: number;
    deadline?: Date;
  },
) => {
  return await Goal.findOneAndUpdate(
    {
      _id: goalId,
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteGoalService = async (goalId: string, userId: string) => {
  return await Goal.findOneAndDelete({
    _id: goalId,
    user: userId,
  });
};
