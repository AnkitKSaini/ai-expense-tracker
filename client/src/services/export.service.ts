import api from "../api/api";
import { saveAs } from "file-saver";

export const exportCSV = async () => {
  const response = await api.get("/expenses/export/csv", {
    responseType: "blob",
  });

  saveAs(response.data, "expenses.csv");
};

export const exportPDF = async () => {
  const response = await api.get("/expenses/export/pdf", {
    responseType: "blob",
  });

  saveAs(response.data, "expense-report.pdf");
};