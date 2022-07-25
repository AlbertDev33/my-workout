import { CreateUserShape } from '@customTypes/index';
import { User } from '@models/user.entity';
import { UpdateResult } from 'typeorm';

import { UpdateUserData } from './IUpdateUserData';

export interface IUserRepository {
  create(user: CreateUserShape): Promise<User>;
  getUser(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | undefined>;
  findBySmsToken(smsToken: string, email: string): Promise<User>;
  updateUser(data: Partial<UpdateUserData>): Promise<UpdateResult>;
}
