import { User } from '@models/user.entity';

import { CreateUserRequest } from './CreateUserRequest';

export interface ICreateUserService {
  execute(user: CreateUserRequest): Promise<User>;
}
