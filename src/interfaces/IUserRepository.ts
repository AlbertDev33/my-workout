import { User } from '@models/user.entity';
import { Workout } from '@models/workout.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  get(id: string): Promise<User>;
  getWorkout(wokoutId: string[]): Promise<Workout[]>;
}
