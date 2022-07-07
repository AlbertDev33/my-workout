import { CreateUserRequest } from './CreateUserRequest';

export interface IAssertRequestService {
  execute(body: CreateUserRequest): Promise<void>;
}
