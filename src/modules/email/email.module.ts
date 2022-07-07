import { MailConfigModule } from '@modules/mailConfig/mail.module';

import { Module } from '@nestjs/common';

import { SendMailService } from './sendMail.service';

@Module({
  imports: [MailConfigModule],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class EmailModule {}
