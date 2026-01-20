/**
 * 📚 第四阶段 - JWT 策略
 * 
 * 用于验证 JWT Token
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key',  // 生产环境应使用环境变量
    });
  }

  async validate(payload: JwtPayload) {
    // 返回的对象会被添加到 req.user
    return { userId: payload.sub, email: payload.email };
  }
}
