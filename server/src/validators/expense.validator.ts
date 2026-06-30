import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().min(3),
  amount: z.number().positive(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  date: z.date().optional(),
});