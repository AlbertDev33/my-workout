export interface ISaveSmsTokenService {
  saveToken(email: string, smsToken: string): Promise<void>;
}
