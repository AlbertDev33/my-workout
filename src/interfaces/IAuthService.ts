import { Tokens } from '@customTypes/tokens.type';

export interface IAuthService {
  signin(): Promise<void>;
  logout(): Promise<void>;
  refreshTokens(): Promise<void>;
  getTokens(userId: string, email: string): Promise<Tokens>;
  updateRefreshToken(refreshToken: string): Promise<string>;
}
