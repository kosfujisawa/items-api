import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithSecret } from 'passport-jwt';
import { JwtPayload } from '../types/jwtPayload';
import { RequestUser } from '../types/requestUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'c9dl7ee04f5b3e553a4cf486dd6cd9b3bdd3aebf65ca84b9f509efe772f5ffc5',
    } as StrategyOptionsWithSecret);
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    return {
      id: payload.sub,
      name: payload.username,
      status: payload.status,
    } as RequestUser;
  }
}
