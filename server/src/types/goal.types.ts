export interface CreateGoalDto {
  title: string;
  targetAmount: number;
  savedAmount?: number;
  deadline: Date;
}