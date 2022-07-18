import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  process.env.REFRESH_TOKEN_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    } as StrategyOptions);
  }

  public validate(req: Request, payload: any) {
    const [_, refreshToken] = req.headers.authorization.split(',');
    return {
      ...payload,
      refreshToken,
    };
  }
}
