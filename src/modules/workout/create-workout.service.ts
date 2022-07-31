import { InjectDependencies } from '@constants/index';
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
    @Inject(InjectDependencies.WorkoutRepository)
    private readonly workoutRepository: IWorkoutRepository,
  ) {}

  public async execute(request: IWorkoutRequest): Promise<IWorkoutResponse> {
    throw new Error('Method not implemented.');
  }
}
