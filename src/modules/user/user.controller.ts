import { InjectTokens } from '@constants/index';
import { ICreateUserService } from '@interfaces/ICreateUserService';

import { Body, Controller, Inject, Post, Req } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    @Inject(InjectTokens.CreateUserService)
    private createUserService: ICreateUserService,
  ) {}

  @Post()
  async createUser(@Body() body: any, @Req() req) {
    await this.createUserService.execute(body);
  }
}
