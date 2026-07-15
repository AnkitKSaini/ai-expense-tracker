import { z } from "zod";

export const backupSchema = z.object({
  version: z.string(),

  exportedAt: z.string().or(z.date()),

  user: z.any().optional(),

  expenses: z.array(z.any()),

  budget: z.any().nullable(),

  goals: z.array(z.any()),

  investments: z.array(z.any()),

  bills: z.array(z.any()),

  recurring: z.array(z.any()),

  notifications: z.array(z.any()),
});