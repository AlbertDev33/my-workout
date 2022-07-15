import { InjectTokens } from '@constants/index';
import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { ICreateUserService } from '@interfaces/ICreateUserService';

import { Body, Controller, Inject, Post, Req } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    @Inject(InjectTokens.CreateUserService)
    private createUserService: ICreateUserService,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserRequest) {
    return await this.createUserService.execute(body);
  }
}
