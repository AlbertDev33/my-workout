import { connection } from '@configs/typeorm.tests';
import { CreateUserShape } from '@customTypes/index';
import { ICreateWorkoutService } from '@interfaces/ICreateWorkoutService';
import { IUserRepository } from '@interfaces/IUserRepository';
import { IWorkoutRepository } from '@interfaces/IWorkoutRepository';
import { User } from '@models/user.entity';
import { Workout } from '@models/workout.entity';
import { UserRepository } from '@modules/user/user.repository';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { CreateWorkoutService } from '../create-workout.service';
import { WorkoutRepository } from '../workout.repository';

type SutType = {
  sut: ICreateWorkoutService;
  workoutRepository: IWorkoutRepository;
  userRepository: IUserRepository;
};

const makeSut = (): SutType => {
  const repositoryWorkout: Repository<Workout> = connection
    .repository()
    .getRepository(Workout);
  const repositoryUser: Repository<User> = connection
    .repository()
    .getRepository(User);
  const userRepository = new UserRepository(repositoryUser);
  const workoutRepository = new WorkoutRepository(repositoryWorkout);
  const sut = new CreateWorkoutService(workoutRepository);

  return {
    sut,
    workoutRepository,
    userRepository,
  };
};

describe('WorkoutService', () => {
  const { userRepository } = makeSut();
  let user: User;
  beforeAll(async () => {
    await connection.crateDatabase();
    await connection.createConnection();
    const createdUser: CreateUserShape = {
      id: v4(),
      name: 'fake_name',
      email: 'fake_email',
      phoneNumber: 'fake_phone_number',
      hashToken: 'hash_token',
    };
    user = await userRepository.create(createdUser);
  });

  afterAll(async () => {
    await connection.close();
    await connection.drop();
  });

  it('should create a workout', async () => {
    const { sut } = makeSut();

    const fakeWorkout = await sut.execute({
      date: new Date(),
      userId: user.id,
    });

    console.log(fakeWorkout);
  });
});
