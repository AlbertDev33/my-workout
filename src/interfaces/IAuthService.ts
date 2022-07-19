import { Tokens } from '@customTypes/tokens.type';

export interface IAuthService {
  signin(smsToken: string, email: string): Promise<Tokens>;
  logout(userId: string): Promise<void>;
  refreshTokens(userId: string, refreshToken: string): Promise<Tokens>;
  getTokens(userId: string, email: string): Promise<Tokens>;
}
