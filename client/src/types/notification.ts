export interface Notification {
  _id: string;

  title: string;

  message: string;

  type:
    | "Expense"
    | "Budget"
    | "Goal"
    | "Investment"
    | "Recurring"
    | "Bill"
    | "AI"
    | "System";

  priority:
    | "Low"
    | "Medium"
    | "High";

  isRead: boolean;

  actionUrl: string;

  createdAt: string;

  updatedAt: string;
}