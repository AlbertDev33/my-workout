import { IMailService } from '@interfaces/IMailService';
import { MailParameters } from '@interfaces/ISendMail';
import { MailgunService, MailgunMessageData } from 'nestjs-mailgun';

import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailgunService: MailgunService) {}

  public async send(mailParameters: MailParameters): Promise<void> {
    const options: MailgunMessageData = {
      from: mailParameters.from,
      to: mailParameters.to,
      subject: mailParameters.subject,
      template: mailParameters.template,
      'h:X-Mailgun-Variables': JSON.stringify(
        mailParameters['h:X-Mailgun-Variables'],
      ),
    };

    await this.mailgunService.createEmail(
      process.env.MAILGUN_MAIL_DOMAIN,
      options,
    );
  }
}
