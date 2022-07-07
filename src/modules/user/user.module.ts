import { InjectTokens } from '@constants/index';
import { User } from '@models/user.entity';
import { EmailModule } from '@modules/email/email.module';
import { SendMailService } from '@modules/email/sendMail.service';
import { MailConfigModule } from '@modules/mailConfig/mail.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssertRequestService } from './assert-request.service';
import { CreateUserService } from './create-user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule, MailConfigModule],
  providers: [
    CreateUserService,
    { provide: InjectTokens.UserRepository, useClass: UserRepository },
    { provide: InjectTokens.CreateUserService, useClass: CreateUserService },
    { provide: InjectTokens.SendMailService, useClass: SendMailService },
    AssertRequestService,
  ],
  controllers: [UserController],
  exports: [CreateUserService],
})
export class UserModule {}
