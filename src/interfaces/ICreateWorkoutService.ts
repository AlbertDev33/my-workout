export interface IWorkoutRequest {
  userId: string;
  date: Date;
}

export interface IWorkoutResponse {
  workoutId: string;
  userId: string;
}

export interface ICreateWorkoutService {
  execute(request: IWorkoutRequest): Promise<IWorkoutResponse>;
}
