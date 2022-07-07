import { IMailService } from '@interfaces/IMailService';
import { ISendMailService, MailParameters } from '@interfaces/ISendMail';
import { MailService } from '@modules/mailConfig/mail.service';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SendMailService implements ISendMailService {
  constructor(private readonly mailService: MailService) {}

  public async execute(mailParameters: MailParameters): Promise<void> {
    await this.mailService.send(mailParameters);
  }
}
