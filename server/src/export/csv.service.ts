import { Parser } from "json2csv";

interface Expense {
  title: string;
  amount: number;
  category: string;
  type: string;
  date: Date;
}

export function generateCSV(
  expenses: Expense[]
) {
  const parser = new Parser({
    fields: [
      "title",
      "amount",
      "category",
      "type",
      "date",
    ],
  });

  return parser.parse(expenses);
}