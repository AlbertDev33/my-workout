import { MailgunModule } from 'nestjs-mailgun';

import { Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          username: 'api',
          key: process.env.MAILGUN_API_KEY,
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailgunModule, MailService],
})
export class MailConfigModule {}
