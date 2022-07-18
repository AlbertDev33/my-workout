import { InjectDependencies } from '@constants/index';
import { User } from '@models/user.entity';
import { EmailModule } from '@modules/email/email.module';
import { SendMailService } from '@modules/email/sendMail.service';
import { MailConfigModule } from '@modules/mailConfig/mail.module';
import { AuthService } from 'auth/auth.service';

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserService } from './create-user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule, MailConfigModule],
  providers: [
    CreateUserService,
    JwtService,
    { provide: InjectDependencies.UserRepository, useClass: UserRepository },
    {
      provide: InjectDependencies.CreateUserService,
      useClass: CreateUserService,
    },
    { provide: InjectDependencies.SendMailService, useClass: SendMailService },
    { provide: InjectDependencies.AuthService, useClass: AuthService },
  ],
  controllers: [UserController],
  exports: [CreateUserService],
})
export class UserModule {}
