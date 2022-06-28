import { User } from '@models/user.entity';

export interface IUsersRepository {
  create(user: User): Promise<User>;
  get(id: string): Promise<User>;
}
