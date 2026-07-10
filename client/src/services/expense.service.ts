import api from "../api/api";
import type {
  CreateExpenseDto,
  UpdateExpenseDto,
} from "../types/expense";

export const getExpenses = async (
  search = "",
  category = "",
  sort = "latest",
  page = 1,
  limit = 10
) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);

  if (category) params.append("category", category);

  params.append("page", String(page));
  params.append("sort", sort);

  params.append("limit", String(limit));

  const { data } = await api.get(
    `/expenses?${params.toString()}`
  );

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


export const getCalendarExpenses = async (
  month: number,
  year: number,
) => {
  const { data } = await api.get(
    `/expense/calendar?month=${month}&year=${year}`,
  );

  return data;
};