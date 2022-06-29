import { User } from '@models/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequest } from 'interfaces/CreateUserRequest';
import { ICreateUserService } from 'interfaces/ICreateUserService';
import { IUserRepository } from 'interfaces/IUserRepository';

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: IUserRepository,
  ) {}

  public async execute(user: CreateUserRequest): Promise<User> {
    const createUser = await this.userRepository.create(user);
    return createUser;
  }
}
