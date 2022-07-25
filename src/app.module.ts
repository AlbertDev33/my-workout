import { typeOrmAsyncConfig } from '@configs/database.config';
import { EmailModule } from '@modules/email/email.module';
import { MailConfigModule } from '@modules/mailConfig/mail.module';
import { UserModule } from '@modules/user/user.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SmsTokenModule } from './modules/sms-token/sms-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    MailConfigModule,
    EmailModule,
    AuthModule,
    PassportModule,
    SmsTokenModule,
  ],
  controllers: [],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
