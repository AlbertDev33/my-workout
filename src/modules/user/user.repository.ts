import { CreateUserShape } from '@customTypes/index';
import { UpdateUserData } from '@interfaces/IUpdateUserData';
import { User } from '@models/user.entity';
import { IUserRepository } from 'interfaces/IUserRepository';
import { Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async create(user: CreateUserShape): Promise<User> {
    const register = this.userRepository.create(user);
    const createdUser = await this.userRepository.save(register);
    return createdUser;
  }

  public async getUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: [{ id }] });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: [{ email }] });
    return user;
  }

  public async findBySmsToken(
    smsToken: string,
    email: string,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: [{ smsToken, email }],
    });
    return user;
  }

  public async updateUser(
    data: Partial<UpdateUserData>,
  ): Promise<UpdateResult> {
    data.updated_at = new Date();
    const { userId, ...restProps } = data;
    const user = await this.userRepository.update(
      { id: userId },
      { ...restProps },
    );
    return user;
  }
}
