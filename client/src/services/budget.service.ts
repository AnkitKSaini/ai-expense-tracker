import api from "../api/api";
import type { CreateBudgetDto } from "../types/budget";

export const createBudget = async (
  budget: CreateBudgetDto
) => {
  const { data } = await api.post("/budget", budget);
  return data;
};

export const getBudget = async (
  month: number,
  year: number
) => {
  const { data } = await api.get(
    `/budget?month=${month}&year=${year}`
  );

  return data;
};