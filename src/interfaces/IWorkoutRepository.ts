import { CreateWorkoutType } from '@customTypes/create_workout.type';

import { IWorkoutResponse } from './ICreateWorkoutService';

export interface IWorkoutRepository {
  create(workoutRequest: CreateWorkoutType): Promise<IWorkoutResponse>;
}
