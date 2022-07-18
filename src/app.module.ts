import { typeOrmAsyncConfig } from '@configs/database.config';
import { EmailModule } from '@modules/email/email.module';
import { MailConfigModule } from '@modules/mailConfig/mail.module';
import { UserModule } from '@modules/user/user.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

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
  ],
  controllers: [],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
