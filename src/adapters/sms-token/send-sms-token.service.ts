import { ISendSmsTokenService } from '@interfaces/ISendSmsTokenService';
import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import { InjectAwsService } from 'nest-aws-sdk';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SendSmsTokenService implements ISendSmsTokenService {
  constructor(@InjectAwsService(SNS) private readonly sns: SNS) {}
  public async sendToken(phoneNumber: string, smsToken: string): Promise<void> {
    const message: PublishInput = {
      Message: `${process.env.SMS_MESSAGE}: ${smsToken}`,
      PhoneNumber: phoneNumber,
    };

    const { MessageId } = await this.sns.publish(message).promise();
    console.log(MessageId);
  }
}
