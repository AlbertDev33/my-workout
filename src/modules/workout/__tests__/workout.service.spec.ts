import { connection } from '@configs/typeorm.tests';
import { ICreateWorkoutService } from '@interfaces/ICreateWorkoutService';
import { Workout } from '@models/workout.entity';
import { Repository } from 'typeorm';

import { CreateWorkoutService } from '../create-workout.service';
import { WorkoutRepository } from '../workout.repository';

type SutType = {
  sut: ICreateWorkoutService;
};

const makeSut = (): SutType => {
  const repositoryWorkout: Repository<Workout> = connection
    .repository()
    .getRepository(Workout);

  const workoutRepository = new WorkoutRepository(repositoryWorkout);
  const sut = new CreateWorkoutService(workoutRepository);

  return {
    sut,
  };
};

describe('WorkoutService', () => {
  beforeAll(async () => {
    await connection.crateDatabase();
    await connection.createConnection();
  });

  afterAll(async () => {
    await connection.close();
    await connection.drop();
  });

  it('should create a workout', async () => {
    const { sut } = makeSut();

    const fakeWorkout = await sut.execute();
  });
});
