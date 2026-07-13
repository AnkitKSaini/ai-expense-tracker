import { z } from "zod";

export const recurringTransactionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  type: z.enum(["Income", "Expense"]),

  amount: z.coerce.number().min(1, "Amount must be greater than zero."),

  category: z.string().trim().min(2, "Category is required."),

  frequency: z.enum(["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]),

  startDate: z.coerce.date(),

  endDate: z.coerce.date().optional(),

  notes: z.string().max(500).optional().default(""),
});
