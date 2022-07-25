export interface ISaveSmsTokenService {
  saveToken(userId: string, smsToken: string): Promise<void>;
}
