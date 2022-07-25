export interface IMakeSmsTokenService {
  makeSmsToken(): Promise<string>;
}
