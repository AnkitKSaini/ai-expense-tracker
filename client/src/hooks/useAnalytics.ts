import { useQuery } from "@tanstack/react-query";
import { getCategoryAnalytics } from "../services/analytics.service";

export const useCategoryAnalytics = () => {
  return useQuery({
    queryKey: ["categoryAnalytics"],
    queryFn: getCategoryAnalytics,
  });
};