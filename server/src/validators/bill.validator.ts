import { z } from "zod";

export const createBillSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(2)
      .max(100),

    amount: z
      .number()
      .positive(),

    category: z
      .string()
      .trim()
      .min(2),

    dueDate: z.coerce.date(),

    reminderDays: z
      .number()
      .min(0)
      .max(30)
      .default(3),

    paymentMethod: z.enum([
      "Cash",
      "UPI",
      "Card",
      "Bank Transfer",
      "Wallet",
      "Other",
    ]),

    notes: z
      .string()
      .max(500)
      .optional(),

    autoCreateExpense:
      z.boolean().optional(),
  });