import {
  IWorkoutRequest,
  IWorkoutResponse,
} from '@interfaces/ICreateWorkoutService';
import { IWorkoutRepository } from '@interfaces/IWorkoutRepository';
import { Workout } from '@models/workout.entity';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

export class WorkoutRepository implements IWorkoutRepository {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
  ) {}

  public async create(
    workoutRequest: IWorkoutRequest,
  ): Promise<IWorkoutResponse> {
    const workoutRegister = this.workoutRepository.create(workoutRequest);
    const { id } = await this.workoutRepository.save(workoutRegister);

    return {
      workoutId: id,
      userId: workoutRequest.userId,
    };
  }
}
