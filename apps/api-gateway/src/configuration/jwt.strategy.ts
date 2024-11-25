import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class BaseJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor(secretKey: string) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: secretKey,
      });
   }

   async validate(payload: any) {
      return { IDUser: payload.sub, username: payload.username };
   }
}

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
   constructor() {
      super(process.env.ACCESS_TOKEN_SECRET);
   }
}

@Injectable()
export class RefreshTokenStrategy extends BaseJwtStrategy {
   constructor() {
      super(process.env.REFRESH_TOKEN_SECRET);
   }
}
