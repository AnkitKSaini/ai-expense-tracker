export interface ExpensePDF {
  title: string;
  amount: number;
  category: string;
  type: "Income" | "Expense";
  date: Date;
}

export interface ReportSummary {
  income: number;
  expense: number;
}

export interface UserInfo {
  name: string;
  email: string;
}

export type PDFDoc = PDFKit.PDFDocument;