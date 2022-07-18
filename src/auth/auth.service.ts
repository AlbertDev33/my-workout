import { InjectDependencies } from '@constants/index';
import { Tokens } from '@customTypes/tokens.type';
import { EAccessDenied } from '@enums/EAccessDenied';
import { IAuthService } from '@interfaces/IAuthService';
import { IUserRepository } from '@interfaces/IUserRepository';
import { hash } from 'bcrypt';

import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  private readonly HASH_SALT = 10;

  constructor(
    private jwtService: JwtService,
    @Inject(InjectDependencies.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async signin(smsToken: string, email: string): Promise<Tokens> {
    const user = await this.userRepository.findBySmsToken(smsToken, email);

    if (!user) throw new ForbiddenException(EAccessDenied.MESSAGE_ERROR);

    const { accessToken, refreshToken } = await this.getTokens(
      user.id,
      user.email,
    );
    const hashToken = await this.updateRefreshToken(refreshToken);
    const data = {
      userId: user.id,
      hashToken,
    };
    await this.userRepository.updateUser(data);

    return {
      accessToken,
      refreshToken,
    };
  }
  public async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async refreshTokens(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async getTokens(userId: string, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: 60 * 15,
        }, // 15 minutes
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 15,
        }, // 15 minutes
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashData(data: string): Promise<string> {
    const hashedData = await hash(data, this.HASH_SALT);
    return hashedData;
  }

  public async updateRefreshToken(refreshToken: string): Promise<string> {
    const hashedData = await this.hashData(refreshToken);
    return hashedData;
  }
}
