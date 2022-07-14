import { IAuthService } from '@interfaces/IAuthService';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  public async signin(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async refreshTokens(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
