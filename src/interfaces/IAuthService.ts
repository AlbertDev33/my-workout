import { Tokens } from '@customTypes/tokens.type';

export interface IAuthService {
  signin(smsToken: string, email: string): Promise<Tokens>;
  logout(): Promise<void>;
  refreshTokens(): Promise<void>;
  getTokens(userId: string, email: string): Promise<Tokens>;
  updateRefreshToken(refreshToken: string): Promise<string>;
}
