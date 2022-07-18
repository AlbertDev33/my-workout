import { Tokens } from '@customTypes/index';

import { CreateUserRequest } from './CreateUserRequest';

export interface ICreateUserService {
  execute(user: CreateUserRequest): Promise<Tokens>;
}
