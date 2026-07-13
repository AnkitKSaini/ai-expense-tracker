import RecurringTransaction from "../models/RecurringTransaction.js";

import type { AuthRequest } from "../middleware/auth.middleware.js";

import { calculateNextRun } from "../utils/recurringScheduler.js";

import Expense from "../models/Expense.js";

export async function createRecurring(
  req: AuthRequest,
) {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const recurring =
    await RecurringTransaction.create({
      ...req.body,

      nextRun: req.body.startDate,

      user: req.user.id,
    });

  return recurring;
}

export async function getRecurring(
  userId: string,
) {
  return RecurringTransaction.find({
    user: userId,
  }).sort({
    nextRun: 1,
  });
}

export async function updateRecurring(
  id: string,
  body: any,
  userId: string,
) {
  return RecurringTransaction.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    body,
    {
      new: true,
    },
  );
}

export async function deleteRecurring(
  id: string,
  userId: string,
) {
  return RecurringTransaction.findOneAndDelete({
    _id: id,
    user: userId,
  });
}


export async function processRecurringTransaction(
  recurringId: string,
) {
  const recurring =
    await RecurringTransaction.findById(
      recurringId,
    );

  if (
    !recurring ||
    !recurring.isActive
  ) {
    return null;
  }

  const today = new Date();

  if (recurring.nextRun > today) {
    return recurring;
  }

  // Create Expense

  await Expense.create({
    title: recurring.title,

    type: recurring.type,

    amount: recurring.amount,

    category: recurring.category,

    date: recurring.nextRun,

    notes: recurring.notes,

    user: recurring.user,
  });

  recurring.nextRun =
    calculateNextRun(
      recurring.nextRun,
      recurring.frequency,
    );

  await recurring.save();

  return recurring;
} 