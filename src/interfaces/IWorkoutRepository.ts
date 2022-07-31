import { IWorkoutRequest, IWorkoutResponse } from './ICreateWorkoutService';

export interface IWorkoutRepository {
  create(workoutRequest: IWorkoutRequest): Promise<IWorkoutResponse>;
}
