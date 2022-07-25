import {
  MakeSmsTokenService,
  SaveSmsTokenService,
  SendSmsTokenService,
  SmsTokenModule,
} from '@adapters/sms-token/index';
import { InjectDependencies } from '@constants/index';
import { UserModule } from '@modules/user/user.module';
import { UserRepository } from '@modules/user/user.repository';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthHandleSmsTokenService } from './auth.handle-sms-token.service';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({}), UserModule, SmsTokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthHandleSmsTokenService,
    { provide: InjectDependencies.UserRepository, useClass: UserRepository },
    {
      provide: InjectDependencies.MakeSmsTokenService,
      useClass: MakeSmsTokenService,
    },
    {
      provide: InjectDependencies.SaveSmsTokenService,
      useClass: SaveSmsTokenService,
    },
    {
      provide: InjectDependencies.SendSmsTokenService,
      useClass: SendSmsTokenService,
    },
  ],
})
export class AuthModule {}
