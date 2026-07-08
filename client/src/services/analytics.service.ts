import api from "../api/api";

export interface CategoryAnalytics {
  category: string;
  total: number;
}

export const getCategoryAnalytics = async (): Promise<CategoryAnalytics[]> => {
  const response = await api.get("/analytics/category");

  return response.data.data;
};