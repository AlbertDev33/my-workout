import { Tokens } from '@customTypes/tokens.type';

import { Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  public async signin(smsToken: string, email: string): Promise<Tokens> {
    return this.authService.signin(smsToken, email);
  }

  @Post('logout')
  public async logout() {
    this.authService.logout();
  }

  @Post('refresh-token')
  public async refreshTokens() {
    this.authService.refreshTokens();
  }
}
