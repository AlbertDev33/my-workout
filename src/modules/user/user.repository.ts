import { User } from '@models/user.entity';
import { Workout } from '@models/workout.entity';
import { CreateUserRequest } from 'interfaces/CreateUserRequest';
import { IUserRepository } from 'interfaces/IUserRepository';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async create(user: CreateUserRequest): Promise<User> {
    const register = this.userRepository.create(user);
    const createdUser = await this.userRepository.save(register);
    return createdUser;
  }

  public async getUser(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async getWorkout(wokoutId: string[]): Promise<Workout[]> {
    throw new Error('Method not implemented.');
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: [{ email }] });
    return user;
  }
}
