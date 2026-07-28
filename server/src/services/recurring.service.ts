import RecurringTransaction, {
  type RecurringTransactionDocument,
} from "../models/RecurringTransaction.js";

import type { AuthRequest } from "../types/auth.types.js";

import { calculateNextRun } from "../utils/recurringScheduler.js";

import Expense from "../models/Expense.js";

import { createNotification } from "./notification.service.js";

type UpdateRecurringData = Partial<
  Omit<
    RecurringTransactionDocument,
    "user" | "createdAt" | "updatedAt"
  >
>;

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
  body: UpdateRecurringData,
  userId: string,
) {
  return RecurringTransaction.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    body,
    {
      returnDocument: "after",
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

  const transaction =
    await Expense.create({
      title: recurring.title,

      type: recurring.type,

      amount: recurring.amount,

      category: recurring.category,

      date: recurring.nextRun,

      notes: recurring.notes,

      user: recurring.user,
    });

  await createNotification(
    {
      title: "Recurring Executed",

      message: `${transaction.title} executed automatically.`,

      type: "Recurring",

      priority: "Medium",

      actionUrl: "/recurring",
    },
    recurring.user.toString(),
  );

  recurring.nextRun =
    calculateNextRun(
      recurring.nextRun,
      recurring.frequency,
    );

  await recurring.save();

  return recurring;
}