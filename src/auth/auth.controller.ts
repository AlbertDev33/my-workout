import { Tokens } from '@customTypes/index';
import { EAuthGuardStrategyName } from '@enums/EAuthGuardStrategyName';
import { Request } from 'express';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthHandleSmsTokenService } from './auth.handle-sms-token.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authHandleSmsToken: AuthHandleSmsTokenService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(
    @Body() body: { smsToken: string; email: string },
  ): Promise<Tokens> {
    return this.authService.signin(body.smsToken, body.email);
  }

  @Get('send-token')
  @HttpCode(HttpStatus.OK)
  public async handleSmsToken(@Req() req: Request): Promise<void> {
    const phoneNumber = req.headers.phonenumber;
    const { email } = req.headers;
    await this.authHandleSmsToken.handleSmsToken(email, phoneNumber);
  }

  @UseGuards(AuthGuard(EAuthGuardStrategyName.ACCESS_TOKEN_STRATEGY_NAME))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Req() req: Request) {
    const { userId } = req;
    await this.authService.logout(userId);
  }

  @UseGuards(AuthGuard(EAuthGuardStrategyName.REFRESH_TOKEN_STRATEGY_NAME))
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(@Req() req: Request) {
    const { userId, refreshToken } = req;
    this.authService.refreshTokens(userId, refreshToken);
  }
}
