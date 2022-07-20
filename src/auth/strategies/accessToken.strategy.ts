import { RequestPayload } from '@customTypes/index';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  process.env.ACCESS_TOKEN_STRATEGY_NAME,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    } as StrategyOptions);
  }

  public validate(payload: RequestPayload) {
    return payload;
  }
}
