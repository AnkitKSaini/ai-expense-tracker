import Expense, {
  type IExpense,
} from "../models/Expense.js";
import Budget from "../models/Budget.js";
import Goal from "../models/Goal.js";
import Investment, {
  type InvestmentDocument,
} from "../models/Investment.js";
import Bill, {
  type BillDocument,
} from "../models/Bill.js";
import RecurringTransaction, {
  type RecurringTransactionDocument,
} from "../models/RecurringTransaction.js";
import Notification, {
  type NotificationDocument,
} from "../models/Notification.js";
import User from "../models/User.js";

import mongoose from "mongoose";
import { BACKUP_VERSION } from "../constants/backup.js";

interface BackupData {
  expenses: IExpense[];
  goals: Record<string, unknown>[];
  investments: InvestmentDocument[];
  bills: BillDocument[];
  recurring: RecurringTransactionDocument[];
  notifications: NotificationDocument[];
  budget: Record<string, unknown> | null;
}

export async function exportBackup(userId: string) {
  const [
    user,
    expenses,
    budget,
    goals,
    investments,
    bills,
    recurring,
    notifications,
  ] = await Promise.all([
    User.findById(userId).select("-password"),
    Expense.find({ user: userId }),
    Budget.findOne({ user: userId }),
    Goal.find({ user: userId }),
    Investment.find({ user: userId }),
    Bill.find({ user: userId }),
    RecurringTransaction.find({
      user: userId,
    }),
    Notification.find({
      user: userId,
    }),
  ]);

  return {
    exportedAt: new Date(),
    version: BACKUP_VERSION,
    user,
    expenses,
    budget,
    goals,
    investments,
    bills,
    recurring,
    notifications,
  };
}

export async function restoreBackup(
  backup: BackupData,
  userId: string,
) {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    await Expense.deleteMany(
      { user: userId },
      { session },
    );

    await Goal.deleteMany(
      { user: userId },
      { session },
    );

    await Investment.deleteMany(
      { user: userId },
      { session },
    );

    await Bill.deleteMany(
      { user: userId },
      { session },
    );

    await RecurringTransaction.deleteMany(
      { user: userId },
      { session },
    );

    await Notification.deleteMany(
      { user: userId },
      { session },
    );

    if (backup.expenses.length) {
      await Expense.insertMany(
        backup.expenses.map((item) => ({
          ...item,
          _id: undefined,
          user: userId,
        })),
        { session },
      );
    }

    if (backup.goals.length) {
      await Goal.insertMany(
        backup.goals.map((item) => ({
          ...item,
          _id: undefined,
          user: userId,
        })),
        { session },
      );
    }

    if (backup.investments.length) {
      await Investment.insertMany(
        backup.investments.map((item) => ({
          ...item,
          _id: undefined,
          user: userId,
        })),
        { session },
      );
    }

    if (backup.bills.length) {
      await Bill.insertMany(
        backup.bills.map((item) => ({
          ...item,
          _id: undefined,
          user: userId,
        })),
        { session },
      );
    }

    if (backup.recurring.length) {
      await RecurringTransaction.insertMany(
        backup.recurring.map((item) => ({
          ...item,
          _id: undefined,
          user: userId,
        })),
        { session },
      );
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}