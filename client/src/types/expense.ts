export type ExpenseType = "income" | "expense";

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  type: ExpenseType;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseDto {
  title: string;
  amount: number;
  category: string;
  type: ExpenseType;
  date?: string;
}

export interface UpdateExpenseDto
  extends Partial<CreateExpenseDto> {}