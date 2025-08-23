import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION'),
    );

    const tokenPayload: TokenPayload = {
      _id: user._id.toHexString(),
      email: user.email,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }


  verifyWs(request: Request): TokenPayload {
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) {
    throw new Error('No cookies present');
  }
  const cookies = cookieHeader.split('; ').map(c => c.trim());
  const authCookie = cookies.find(c => c.startsWith('Authentication='));
  if (!authCookie) {
    throw new Error('Authentication cookie missing');
  }
  const jwt = authCookie.substring('Authentication='.length);
  return this.jwtService.verify<TokenPayload>(jwt);
}


  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
