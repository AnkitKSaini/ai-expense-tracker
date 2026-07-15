import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().min(3),
  amount: z.number().positive(),
  category: z.string().min(2),
  type: z.enum(["Income", "Expense"]),
  date: z.coerce.date().optional(),
});

export const updateExpenseSchema =
  createExpenseSchema.partial();