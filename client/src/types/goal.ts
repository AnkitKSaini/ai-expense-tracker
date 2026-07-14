export interface Goal {
  _id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
    completed: boolean;

}

export interface CreateGoalDto {
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
}