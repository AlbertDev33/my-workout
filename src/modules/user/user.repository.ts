import { User } from '@models/user.entity';
import { Workout } from '@models/workout.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequest } from 'interfaces/CreateUserRequest';
import { IUserRepository } from 'interfaces/IUserRepository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  public async create(user: CreateUserRequest): Promise<User> {
    const register = this.userRepository.create(user);
    const createdUser = await this.userRepository.save(register);
    return createdUser;
  }

  public async get(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async getWorkout(wokoutId: string[]): Promise<Workout[]> {
    throw new Error('Method not implemented.');
  }

  public async findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
