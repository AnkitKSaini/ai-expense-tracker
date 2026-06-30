export type ExpenseType = "income" | "expense";

export interface ExpenseParams {
  id: string;
}

export interface CreateExpenseDto {
  title: string;
  amount: number;
  category: string;
  type: ExpenseType;
  date?: Date;
}

export interface UpdateExpenseDto
  extends Partial<CreateExpenseDto> {}