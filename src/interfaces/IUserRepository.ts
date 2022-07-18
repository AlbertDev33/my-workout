import { User } from '@models/user.entity';
import { Workout } from '@models/workout.entity';
import { UpdateResult } from 'typeorm';

import { CreateUserRequest } from './CreateUserRequest';
import { UpdateUserData } from './IUpdateUserData';

export interface IUserRepository {
  create(user: CreateUserRequest): Promise<User>;
  getUser(id: string): Promise<User>;
  getWorkout(wokoutId: string[]): Promise<Workout[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findBySmsToken(smsToken: string, email: string): Promise<User>;
  updateUser(data: Partial<UpdateUserData>): Promise<UpdateResult>;
}
