import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(3, "Title is required"),
  amount: z.coerce
    .number()
    .positive("Amount must be greater than 0"),
  category: z.string().min(1, "Select category"),
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, "Select date"),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;