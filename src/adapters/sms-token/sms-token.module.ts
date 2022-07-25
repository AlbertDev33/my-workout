import { InjectDependencies } from '@constants/index';
import { UserModule } from '@modules/user/user.module';
import { UserRepository } from '@modules/user/user.repository';
import { SNS } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';

import { Module } from '@nestjs/common';

import { MakeSmsTokenService } from './make-sms-token.service';
import { SaveSmsTokenService } from './save-sms-token.service';
import { SendSmsTokenService } from './send-sms-token.service';

@Module({
  imports: [UserModule, AwsSdkModule.forFeatures([SNS])],
  providers: [
    MakeSmsTokenService,
    SaveSmsTokenService,
    SendSmsTokenService,
    { provide: InjectDependencies.UserRepository, useClass: UserRepository },
  ],
  exports: [SendSmsTokenService, MakeSmsTokenService, SaveSmsTokenService],
})
export class SmsTokenModule {}
