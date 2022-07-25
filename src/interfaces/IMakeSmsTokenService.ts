export interface IMakeSmsTokenService {
  makeSmsToken(email: string, phoneNumber: string): Promise<string>;
}
