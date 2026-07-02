import api from "../api/api";
import type { DashboardSummary } from "../types/dashboard";

interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardSummary;
}

export async function getDashboardSummary() {
  const response =
    await api.get<DashboardResponse>("/dashboard");

  return response.data.data;
}