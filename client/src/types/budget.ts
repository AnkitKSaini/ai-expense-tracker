export interface Budget {
  _id: string;
  amount: number;
  month: number;
  year: number;
}

export interface CreateBudgetDto {
  amount: number;
  month: number;
  year: number;
}