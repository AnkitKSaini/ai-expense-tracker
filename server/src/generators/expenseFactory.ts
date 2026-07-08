import expenseTitles from "./expense.generator.js";

const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Travel",
];

const incomeCategories = [
  "Salary",
  "Freelance",
  "Investment",
];

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

function randomDate() {
  const start = new Date("2025-01-01").getTime();
  const end = new Date().getTime();

  return new Date(
    start + Math.random() * (end - start)
  );
}

export function generateExpense() {
  const isIncome = Math.random() < 0.2;

  const category = isIncome
    ? randomItem(incomeCategories)
    : randomItem(expenseCategories);

  const titles =
    expenseTitles[
      category as keyof typeof expenseTitles
    ];

  return {
    title: randomItem(titles),
    amount: isIncome
      ? randomNumber(15000, 80000)
      : randomNumber(100, 5000),
    category,
    type: isIncome ? "income" : "expense",
    date: randomDate(),
  };
}