import api from "../api/api";
import { saveAs } from "file-saver";

export const exportCSV = async () => {
  const response = await api.get("/expense/export/csv", {
    responseType: "blob",
  });

  saveAs(response.data, "expenses.csv");
};