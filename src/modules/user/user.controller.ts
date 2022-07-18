import { InjectDependencies } from '@constants/index';
import { Tokens } from '@customTypes/index';
import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { ICreateUserService } from '@interfaces/ICreateUserService';

import { Body, Controller, Inject, Post, Req } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    @Inject(InjectDependencies.CreateUserService)
    private createUserService: ICreateUserService,
  ) {}

  @Post()
  public async createUser(@Body() body: CreateUserRequest): Promise<Tokens> {
    return this.createUserService.execute(body);
  }
}
