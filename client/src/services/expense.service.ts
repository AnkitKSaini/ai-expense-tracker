import api from "../api/api";
import type {
  CreateExpenseDto,
  UpdateExpenseDto,
} from "../types/expense";

export const getExpenses = async () => {
  const { data } = await api.get("/expenses");
  return data;
};

export const createExpense = async (
  expense: CreateExpenseDto
) => {
  const { data } = await api.post("/expenses", expense);
  return data;
};

export const updateExpense = async (
  id: string,
  expense: UpdateExpenseDto
) => {
  const { data } = await api.put(`/expenses/${id}`, expense);
  return data;
};

export const deleteExpense = async (id: string) => {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
};