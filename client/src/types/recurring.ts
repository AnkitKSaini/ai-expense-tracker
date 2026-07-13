export interface RecurringTransaction {
  _id: string;

  title: string;

  type: "Income" | "Expense";

  amount: number;

  category: string;

  frequency:
    | "Daily"
    | "Weekly"
    | "Monthly"
    | "Quarterly"
    | "Yearly";

  startDate: string;

  endDate?: string;

  nextRun: string;

  isActive: boolean;

  notes: string;

  createdAt: string;

  updatedAt: string;
}