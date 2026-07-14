import { z } from "zod";

export const createNotificationSchema =
  z.object({
    title: z.string().min(2).max(100),

    message: z
      .string()
      .min(2)
      .max(500),

    type: z.enum([
      "Expense",
      "Budget",
      "Goal",
      "Investment",
      "Recurring",
      "Bill",
      "AI",
      "System",
    ]),

    priority: z.enum([
      "Low",
      "Medium",
      "High",
    ]),

    actionUrl: z
      .string()
      .optional(),
  });