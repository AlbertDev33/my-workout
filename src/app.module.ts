import { typeOrmAsyncConfig } from '@configs/database.config';
import { EmailModule } from '@modules/email/email.module';
import { MailConfigModule } from '@modules/mailConfig/mail.module';
import { UserModule } from '@modules/user/user.module';
import { AwsSdkModule } from 'nest-aws-sdk';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SmsTokenModule } from './adapters/sms-token/sms-token.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_KEY_ID,
          },
        },
      },
    }),
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
