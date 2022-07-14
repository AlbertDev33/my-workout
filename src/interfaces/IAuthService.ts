export interface IAuthService {
  signin(): Promise<void>;
  logout(): Promise<void>;
  refreshTokens(): Promise<void>;
}
