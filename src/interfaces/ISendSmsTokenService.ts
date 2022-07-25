export interface ISendSmsTokenService {
  sendToken(phoneNumber: string, smsToken: string): Promise<void>;
}
