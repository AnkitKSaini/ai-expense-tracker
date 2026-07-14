export interface Bill {
  _id: string;

  title: string;

  amount: number;

  category: string;

  dueDate: string;

  reminderDays: number;

  status:
    | "Pending"
    | "Paid"
    | "Skipped";

  paymentMethod:
    | "Cash"
    | "UPI"
    | "Card"
    | "Bank Transfer"
    | "Wallet"
    | "Other";

  notes: string;

  autoCreateExpense: boolean;

  paidAt?: string;

  createdAt: string;

  updatedAt: string;
}