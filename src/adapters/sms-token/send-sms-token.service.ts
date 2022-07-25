import { ISendSmsTokenService } from '@interfaces/ISendSmsTokenService';
import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import { InjectAwsService } from 'nest-aws-sdk';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SendSmsTokenService implements ISendSmsTokenService {
  private readonly CONTRY_CODE = '+55';
  private readonly REPLACED_VALUE = /\+55|\(|\)|\-|\ /g;

  constructor(@InjectAwsService(SNS) private readonly sns: SNS) {}
  public async sendToken(phoneNumber: string, smsToken: string): Promise<void> {
    const phone = phoneNumber.replace(this.REPLACED_VALUE, '');
    const hadledPhoneNumber = `${this.CONTRY_CODE}${phone}`;

    const message: PublishInput = {
      Message: `${process.env.SMS_MESSAGE}: ${smsToken}`,
      PhoneNumber: hadledPhoneNumber,
    };

    const { MessageId } = await this.sns.publish(message).promise();
    console.log(MessageId);
  }
}
