import api from "../api/api";
import type {  CreateGoalDto } from "../types/goal";

import type { GoalPrediction } from "../types/goalPrediction";


export const getGoals = async () => {
  const { data } = await api.get("/goal");
  return data;
};

export const createGoal = async (goal: CreateGoalDto) => {
  const { data } = await api.post("/goal", goal);

  return data;
};

export const deleteGoal = async (id: string) => {
  const { data } = await api.delete(`/goal/${id}`);

  return data;
};

export const updateGoal = async (id: string, goal: CreateGoalDto) => {
  const { data } = await api.put(`/goal/${id}`, goal);

  return data;
};

 
export const predictGoal = async (goal: {
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}) => {
  const { data } = await api.post<{
    success: boolean;
    data: GoalPrediction;
  }>("/goal/predict", goal);

  return data.data;
};