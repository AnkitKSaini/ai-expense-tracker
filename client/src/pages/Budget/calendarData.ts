export interface CalendarExpense {
  date: number;
  amount: number;
  type: "Income" | "Expense";
  category: string;
}

export const calendarData: CalendarExpense[] = [
  {
    date: 2,
    amount: 450,
    type: "Expense",
    category: "Food",
  },
  {
    date: 5,
    amount: 1200,
    type: "Expense",
    category: "Shopping",
  },
  {
    date: 7,
    amount: 900,
    type: "Income",
    category: "Salary",
  },
  {
    date: 12,
    amount: 2500,
    type: "Expense",
    category: "Travel",
  },
  {
    date: 15,
    amount: 700,
    type: "Expense",
    category: "Food",
  },
  {
    date: 18,
    amount: 1500,
    type: "Income",
    category: "Freelance",
  },
  {
    date: 22,
    amount: 340,
    type: "Expense",
    category: "Transport",
  },
  {
    date: 28,
    amount: 1100,
    type: "Expense",
    category: "Shopping",
  },
];