import { InjectDependencies } from '@constants/index';
import { CreateWorkoutType } from '@customTypes/create_workout.type';
import { ICreateIdService } from '@interfaces/ICreateIdService';
import {
  ICreateWorkoutService,
  IWorkoutRequest,
  IWorkoutResponse,
} from '@interfaces/ICreateWorkoutService';
import { IWorkoutRepository } from '@interfaces/IWorkoutRepository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateWorkoutService implements ICreateWorkoutService {
  constructor(
    @Inject(InjectDependencies.CreateIdService)
    private readonly createId: ICreateIdService,
    @Inject(InjectDependencies.WorkoutRepository)
    private readonly workoutRepository: IWorkoutRepository,
  ) {}

  public async execute(request: IWorkoutRequest): Promise<IWorkoutResponse> {
    const id = this.createId.create();
    const createWorkout: CreateWorkoutType = {
      id,
      userId: request.userId,
      date: request.date,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const workout = await this.workoutRepository.create(createWorkout);
    return workout;
  }
}
