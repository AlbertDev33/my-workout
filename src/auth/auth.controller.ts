import { Tokens } from '@customTypes/index';
import { Request } from 'express';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(
    @Body() smsToken: string,
    email: string,
  ): Promise<Tokens> {
    return this.authService.signin(smsToken, email);
  }

  @UseGuards(AuthGuard(process.env.ACCESS_TOKEN_STRATEGY_NAME))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Req() req: Request) {
    const { userId } = req;

    await this.authService.logout(userId);
  }

  @UseGuards(AuthGuard(process.env.REFRESH_TOKEN_STRATEGY_NAME))
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(@Req() req: Request) {
    const { userId, refreshToken } = req;

    this.authService.refreshTokens(userId, refreshToken);
  }
}
