export interface IAuthHandleSmsTokenService {
  handleSmsToken(email: string, phoneNumber: string): Promise<void>;
}
