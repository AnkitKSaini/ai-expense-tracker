export interface Goal {
  _id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}

export interface CreateGoalDto {
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}