export interface CalendarExpense {
  date: number;
  amount: number;
  type: "income" | "expense";
  category: string;
}

export const calendarData: CalendarExpense[] = [
  {
    date: 2,
    amount: 450,
    type: "expense",
    category: "Food",
  },
  {
    date: 5,
    amount: 1200,
    type: "expense",
    category: "Shopping",
  },
  {
    date: 7,
    amount: 900,
    type: "income",
    category: "Salary",
  },
  {
    date: 12,
    amount: 2500,
    type: "expense",
    category: "Travel",
  },
  {
    date: 15,
    amount: 700,
    type: "expense",
    category: "Food",
  },
  {
    date: 18,
    amount: 1500,
    type: "income",
    category: "Freelance",
  },
  {
    date: 22,
    amount: 340,
    type: "expense",
    category: "Transport",
  },
  {
    date: 28,
    amount: 1100,
    type: "expense",
    category: "Shopping",
  },
];