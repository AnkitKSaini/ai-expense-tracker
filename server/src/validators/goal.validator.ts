import { z } from "zod";

export const createGoalSchema = z.object({
  title: z.string().min(2),

  targetAmount: z.number().positive(),

  savedAmount: z.number().optional(),

  deadline: z.string(),
});