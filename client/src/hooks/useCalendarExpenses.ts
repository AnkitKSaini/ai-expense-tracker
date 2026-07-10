import { useQuery } from "@tanstack/react-query";
import * as expenseService from "../services/expense.service";

export function useCalendarExpenses(
  month: number,
  year: number,
) {
  return useQuery({
    queryKey: ["calendar-expenses", month, year],

    queryFn: () =>
      expenseService.getCalendarExpenses(
        month,
        year,
      ),
  });
}