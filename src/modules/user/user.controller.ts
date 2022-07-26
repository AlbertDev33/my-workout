import { InjectDependencies } from '@constants/index';
import { Tokens } from '@customTypes/index';
import { CreateUserRequest } from '@interfaces/CreateUserRequest';
import { ICreateUserService } from '@interfaces/ICreateUserService';
import { Request } from 'express';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';

import { ConfirmEmailService } from './confirmEmail.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(InjectDependencies.CreateUserService)
    private createUserService: ICreateUserService,
    private confirmEmail: ConfirmEmailService,
  ) {}

  @Post()
  public async createUser(@Body() body: CreateUserRequest): Promise<Tokens> {
    return this.createUserService.execute(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async confirmUserEmail(@Req() req: Request) {
    const userId = req.headers.userid;
    const userToken = req.headers.usertoken;
    await this.confirmEmail.execute(userId, userToken);
  }
}
