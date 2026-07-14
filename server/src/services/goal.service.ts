import Goal from "../models/Goal.js";
import { createNotification } from "./notification.service.js";

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

export const getGoalsService = async (
  userId: string,
) => {
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
  const goal = await Goal.findOneAndUpdate(
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

  if (!goal) {
    return null;
  }

  // Goal Completed Notification
  if (
    goal.savedAmount >=
    goal.targetAmount
  ) {
    await createNotification(
      {
        title: "Goal Completed",

        message: `${goal.title} completed successfully.`,

        type: "Goal",

        priority: "High",

        actionUrl: "/goals",
      },
      userId,
    );
  }

  return goal;
};

export const deleteGoalService = async (
  goalId: string,
  userId: string,
) => {
  return Goal.findOneAndDelete({
    _id: goalId,
    user: userId,
  });
};