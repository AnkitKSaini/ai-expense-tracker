export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Education",
  "Entertainment",
  "Salary",
  "Investment",
  "Other",
] as const;

export type ExpenseCategory =
  (typeof EXPENSE_CATEGORIES)[number];