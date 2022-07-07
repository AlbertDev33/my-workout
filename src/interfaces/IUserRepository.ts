import { User } from '@models/user.entity';
import { Workout } from '@models/workout.entity';

import { CreateUserRequest } from './CreateUserRequest';

export interface IUserRepository {
  create(user: CreateUserRequest): Promise<User>;
  getUser(id: string): Promise<User>;
  getWorkout(wokoutId: string[]): Promise<Workout[]>;
  findByEmail(email: string): Promise<User | undefined>;
}
