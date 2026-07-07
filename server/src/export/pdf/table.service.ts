import { PDF } from "./constants.js";
import type { ExpensePDF, PDFDoc } from "./types.js";

export function drawExpenseTable(doc: PDFDoc, expenses: ExpensePDF[]) {
  const startX = 40;
  let y = 330;

  const rowHeight = 28;

  const columns = [
    { title: "Date", width: 80 },
    { title: "Title", width: 140 },
    { title: "Category", width: 110 },
    { title: "Type", width: 70 },
    { title: "Amount", width: 85 },
  ];

  // ===========================
  // Title
  // ===========================

  doc
    .fillColor(PDF.COLORS.TEXT)
    .fontSize(16)
    .text("Expense Details", startX, y);

  y += 30;

  // ===========================
  // Header
  // ===========================

  let x = startX;

  columns.forEach((column) => {
    doc
      .rect(x, y, column.width, rowHeight)
      .fillAndStroke(PDF.COLORS.PRIMARY, PDF.COLORS.PRIMARY);

    doc
      .fillColor("white")
      .fontSize(10)
      .text(column.title, x + 8, y + 9, {
        width: column.width - 10,
      });

    x += column.width;
  });

  y += rowHeight;

  // ===========================
  // Rows
  // ===========================

  expenses.forEach((expense, index) => {
    // Auto Page Break
    if (y > 740) {
      doc.addPage();

      y = 50;

      x = startX;

      columns.forEach((column) => {
        doc
          .rect(x, y, column.width, rowHeight)
          .fillAndStroke(PDF.COLORS.PRIMARY, PDF.COLORS.PRIMARY);

        doc
          .fillColor("white")
          .fontSize(10)
          .text(column.title, x + 8, y + 9, {
            width: column.width - 10,
          });

        x += column.width;
      });

      y += rowHeight;
    }

    const bg = index % 2 === 0 ? "#FFFFFF" : "#F8FAFC";

    doc.rect(startX, y, 485, rowHeight).fill(bg);

    x = startX;

    const values = [
      new Date(expense.date).toLocaleDateString(),

      expense.title,

      expense.category,

      expense.type,

      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(expense.amount),
    ];

    values.forEach((value, columnIndex) => {
      const column = columns[columnIndex];

      if (!column) return;

      const width = column.width;

      doc
        .fillColor(PDF.COLORS.TEXT)
        .fontSize(10)
        .text(String(value), x + 8, y + 9, {
          width: width - 10,
        });

      x += width;
    });

    y += rowHeight;
  });

  doc.y = y + 20;
}
