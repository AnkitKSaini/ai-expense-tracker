import { saveAs } from "file-saver";

import api from "../api/api";

export async function exportPortfolioPDF() {
  const response = await api.get(
    "/investment/export/pdf",
    {
      responseType: "blob",
    },
  );

  saveAs(
    response.data,
    "Portfolio-Report.pdf",
  );
}